import { X } from "lucide-react";
import { useUpdatePartner } from "../hooks/UseUpdatePartners";

const UpdatePartnerModel = ({ id, sh, onClose }) => {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handleUpdate,
    isLoading,
    isFetching,
  } = useUpdatePartner(id, sh, onClose);

  if (!sh) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-[15em] ">
      <div className="bg-white p-6 rounded-lg w-[60em] shadow-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold">Update Partner</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose(false)}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-row">
          {/* Image Upload Section */}
          <div className="p-4 w-[40%]">
            <div className="bg-white p-6 shadow-lg rounded-2xl w-full">
              <h2 className="text-xl font-bold text-center mb-5">Add an image</h2>

              <div className="w-[18em] h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
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

              {formData.image && (
                <div className="flex justify-between mt-2 bg-gray-100 p-2 border rounded-md">
                  <span className="text-sm">{formData.image.name}</span>
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

          {/* Form Inputs */}
          <div className="p-5 w-[60%]">
            <div className="mt-4 grid grid-cols-1 gap-8">
              <div className="input-group">
                <span className="btn btn-input w-[10em]">Name</span>
                <input
                  className="input"
                  placeholder="Enter Partner Name..."
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

       

                  <div className="input-group">
                <span className="btn btn-input w-[10em]">Phone</span>
                <input
                  className="input"
                  placeholder="Enter Phone Number..."
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

                <div className="input-group">
                <span className="btn btn-input w-[10em]">Email</span>
                <input
                  className="input"
                  placeholder="Enter Email..."
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <button className="btn btn-light" onClick={() => onClose(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Partner"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePartnerModel;
