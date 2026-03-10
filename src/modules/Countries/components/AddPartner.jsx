import { X } from "lucide-react";
import usePostPartner from "../hooks/UseAddPartners";

const AddPartnerModel = ({ sh, onClose }) => {
  const {
    Data,
    setFormData,
    handleImageChange,
    preview,
    handlePost,
    isLoading,
  } = usePostPartner(onClose);

  if (!sh) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setFormData({ ...Data, image: null });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[35em] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Add Partner Image</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[20em] bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
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
            {isLoading ? "Adding..." : "Add Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPartnerModel;
