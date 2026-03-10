import { X } from "lucide-react";
import { useUpdateCountry } from "../hooks/useUpdateCountry";

const UpdateCountryModel = ({ id, sh, onClose }) => {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    handleUpdate,
    isLoading,
    isFetching,
  } = useUpdateCountry(id, sh, onClose);

  if (!sh) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    preview && URL.revokeObjectURL(preview);
  };

  const languages = ["en", "ar", "tr"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[55em] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Update Country</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* لو البيانات لسة بتتحمل */}
        {isFetching ? (
          <div className="flex items-center justify-center h-[20em]">
            <span className="text-gray-500 text-lg animate-pulse">
              Loading country data...
            </span>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="grid grid-cols-2 gap-6">
              {/* Image Upload Section */}
              <div className="flex flex-col items-center">
                <div className="w-full h-[18em] bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="object-contain h-full w-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No image selected
                    </span>
                  )}
                </div>

                {formData.image && (
                  <div className="flex justify-between items-center mt-3 bg-gray-50 px-3 py-2 rounded-lg w-full">
                    <span className="text-sm truncate">
                      {formData.image.name}
                    </span>
                    <button onClick={removeImage}>
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="mt-5 block w-full text-sm text-gray-600 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-full file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-blue-100 file:text-blue-700 
                    hover:file:bg-blue-200"
                />
              </div>

              {/* Country Name Inputs */}
              <div>
                <h4 className="font-semibold mb-2">Country Name</h4>
                {languages.map((lang) => (
                  <div className="input-group mb-3" key={lang}>
                    <span className="btn btn-input w-[9em]">
                      {`Name (${lang.toUpperCase()})`}
                    </span>
                    <input
                      placeholder={
                        lang === "ar"
                          ? "Arabic Name"
                          : lang === "en"
                            ? "English Name"
                            : "Turkish Name"
                      }
                      type="text"
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
                <div className="input-group mb-3">
                  <span className="btn btn-input w-[9em]">Flag emoji</span>
                  <input
                    type="text"
                    value={formData?.flag || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="input w-full"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6 gap-3">
              <button className="btn btn-light" onClick={() => onClose(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Country"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateCountryModel;
