import { X } from "lucide-react";
import usePostCountry from "../hooks/useAddCountry";

const AddCountryModel = ({ sh, onClose }) => {
  const {
    Data,
    setFormData,
    handleImageChange,
    preview,
    setPreview,
    handlePost,
    isLoading,
  } = usePostCountry(onClose);

  if (!sh) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setFormData({ ...Data, image: null });
    preview && URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const languages = ["en", "ar", "tr"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[50em] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Add Country</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Image Upload */}
          <div className="flex flex-col items-center">
            <div className="w-full h-[18em] bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="object-contain h-full w-full"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image selected</span>
              )}
            </div>

            {Data.image && (
              <div className="flex justify-between items-center mt-3 bg-gray-50 px-3 py-2 rounded-lg w-full">
                <span className="text-sm truncate">{Data.image.name}</span>
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

          {/* Right Column - Country Name Inputs */}
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
                  value={Data.name?.[lang] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...Data,
                      name: { ...Data.name, [lang]: e.target.value },
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
                value={Data.flag || ""}
                onChange={(e) =>
                  setFormData({
                    ...Data,
                    flag: e.target.value,
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
            onClick={handlePost}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Country"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCountryModel;
