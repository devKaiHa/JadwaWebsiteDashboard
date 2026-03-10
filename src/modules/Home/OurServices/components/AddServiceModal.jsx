import { UsePostService } from "../hooks/UseAddService";
import { X } from "lucide-react";

const AddServiceModal = ({ sh, onClose }) => {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handlePost,
    isLoading,
  } = UsePostService(onClose);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, photo: null });
  };

  return (
    <div>
      {sh && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-[15em]">
          <div className="bg-white p-6 rounded-lg w-[70em] shadow-lg">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold">Add Service</h3>
              <button onClick={() => onClose(false)}>✕</button>
            </div>

            <div className="flex flex-row">
              <div className="p-4 w-[30%]">
                <div className="bg-white p-6 shadow-lg rounded-2xl w-full">
                  <h2 className="text-xl font-bold text-center mb-4">
                    Add an image
                  </h2>

                  <div className="w-[15em] h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <img
                      src={preview || "/public/assets/service-detailes.jpg"}
                      alt=""
                      className="object-contain h-full w-full"
                    />
                  </div>

                  {formData.photo && (
                    <div className="flex justify-between mt-2 bg-gray-100 p-2 border rounded-md">
                      <span className="text-sm">{formData.photo.name}</span>
                      <button onClick={removeImage}>
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="mt-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                </div>
              </div>

            
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <button className="btn btn-light" onClick={() => onClose(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handlePost}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddServiceModal;
