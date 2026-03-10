import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePostPartnerMutation } from "../../../rtk/Partners/PartnersApi";
import { toast } from "react-toastify";

const AddPartnerModel = ({ sh, onClose }) => {
  const [formData, setFormData] = useState({ image: null });
  const [preview, setPreview] = useState(null);

  const [postPartner, { isLoading, isSuccess, error }] =
    usePostPartnerMutation();

  if (!sh) return null;

  const handleImageChange = (file) => {
    setFormData({ image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setFormData({ image: null });
    setPreview(null);
  };

  const handlePost = async () => {
    if (!formData.image) {
      toast.error("Please Enter Image");

      return;
    }

    try {
      const fd = new FormData();
      fd.append("img", formData.image);

      await postPartner(fd).unwrap();
      toast.success("Partner Added successfully");

      // Reset form
      setFormData({ image: null });
      setPreview(null);
      onClose(false);
    } catch (err) {
      console.error("Error uploading partner image:", err);
    }
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

          {formData.image && (
            <div className="flex justify-between items-center mt-3 bg-gray-50 px-3 py-2 rounded-lg w-full">
              <span className="text-sm truncate">{formData.image.name}</span>
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

        {error && (
          <p className="text-red-500 text-sm mt-3">
            Failed to upload image. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddPartnerModel;
