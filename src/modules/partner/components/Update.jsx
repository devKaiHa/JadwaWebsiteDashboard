import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  useGetOnePartnerQuery,
  useUpdatePartnerMutation,
} from "../../../rtk/Partners/PartnersApi";
import { toast } from "react-toastify";

const UpdatePartnerModel = ({ sh, onClose, id }) => {
  const [formData, setFormData] = useState({ images: [] });
  const [preview, setPreview] = useState([]);

  const { data, isLoading: isFetching } = useGetOnePartnerQuery(id, {
    skip: !id || !sh,
  });

  const [updatePartner, { isLoading, error }] = useUpdatePartnerMutation();

  useEffect(() => {
    if (data?.data?.img?.length) {
      setPreview(data.data.img); // backend images
      setFormData({ images: [] });
    }
  }, [data]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({ images: [...prev.images, ...files] }));
      setPreview((prev) => [...prev, ...newPreviews]);
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { images: updated };
    });

    setPreview((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleUpdate = async () => {
    try {
      if (!formData.images.length) {
        toast.error("Please select at least one image");
        return;
      }

      const fd = new FormData();
      fd.append("partnersTitle", "");
      formData.images.forEach((img) => fd.append("img", img)); // multiple

      await updatePartner({ id, formData: fd }).unwrap();

      setFormData({ images: [] });
      setPreview([]);
      onClose(false);
      toast.success("Partner updated successfully");
    } catch (err) {
      console.error("Error updating partner images:", err);
    }
  };

  if (!sh) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[35em] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Update Partner Images</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-3 w-full max-h-[20em] overflow-y-auto">
            {isFetching ? (
              <span className="text-gray-400 text-sm">Loading...</span>
            ) : preview.length ? (
              preview.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="object-contain h-full w-full"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    onClick={() => removeImage(idx)}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-sm col-span-2">
                No images selected
              </span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
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
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Images"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">
            Failed to update images. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdatePartnerModel;
