import { X } from "lucide-react";
import { useUpdateChooseUs } from "../hooks/useUpdateChooseUs";

const UpdateChooseUsModal = ({ id, sh, onClose }) => {
  const { formData, setFormData, handleUpdate, isLoading, isFetching } =
    useUpdateChooseUs(id, sh, onClose);

  if (!sh) return null;

  const languages = ["en", "ar", "tr"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl w-[50em] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Update Choose Us</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading */}
        {isFetching ? (
          <div className="flex items-center justify-center h-[20em]">
            <span className="text-gray-500 text-lg animate-pulse">
              Loading Choose Us data...
            </span>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="grid grid-cols-1 gap-6">
              {/* Title Inputs */}
              <div>
                <h4 className="font-semibold mb-2">Title</h4>
                {languages.map((lang) => (
                  <div className="input-group mb-3" key={`title-${lang}`}>
                    <span className="btn btn-input w-[9em]">{`Title (${lang.toUpperCase()})`}</span>
                    <input
                      type="text"
                      placeholder={`Title in ${lang.toUpperCase()}`}
                      value={formData.title?.[lang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, [lang]: e.target.value },
                        })
                      }
                      className="input w-full"
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </div>

              {/* Description Inputs */}
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                {languages.map((lang) => (
                  <div className="input-group mb-3" key={`desc-${lang}`}>
                    <span className="btn btn-input w-[9em]">{`Description (${lang.toUpperCase()})`}</span>
                    <input
                      type="text"
                      placeholder={`Description in ${lang.toUpperCase()}`}
                      value={formData.description?.[lang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            [lang]: e.target.value,
                          },
                        })
                      }
                      className="input w-full"
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="btn btn-light"
                onClick={() => onClose(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Choose Us"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateChooseUsModal;
