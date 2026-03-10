import { X } from "lucide-react";
import { useUpdatePartner } from "../hooks/useUpdatePartner";

const UpdatePartnerModal = ({ id, sh, onClose }) => {
  const { formData, setFormData, handleUpdate, isLoading, isFetching } =
    useUpdatePartner(id, sh, onClose);

  if (!sh) return null;

  const languages = ["en", "ar", "tr"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl w-[50em] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Update Partner</h3>
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
              Loading partner data...
            </span>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="grid grid-cols-1 gap-6">
              {/* Name Inputs */}
              <div>
                <h4 className="font-semibold mb-2">Name</h4>
                {languages.map((lang) => (
                  <div className="input-group mb-3" key={`name-${lang}`}>
                    <span className="btn btn-input w-[9em]">{`Name (${lang.toUpperCase()})`}</span>
                    <input
                      type="text"
                      placeholder={`Name in ${lang.toUpperCase()}`}
                      value={formData.name?.[lang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: { ...formData.name, [lang]: e.target.value },
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
                    <span className="btn btn-input w-[9em]">{`Desc (${lang.toUpperCase()})`}</span>
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

              {/* Logo Upload */}
              <div>
                <h4 className="font-semibold mb-2">Logo</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logo: e.target.files[0], // نحفظ الملف عشان يتبعت للـ API
                    })
                  }
                  className="input w-full"
                  disabled={isLoading}
                />
                {formData.logo && typeof formData.logo === "string" && (
                  <img
                    src={formData.logo}
                    alt="Partner Logo"
                    className="mt-2 h-20 object-contain"
                  />
                )}
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
                {isLoading ? "Updating..." : "Update Partner"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdatePartnerModal;
