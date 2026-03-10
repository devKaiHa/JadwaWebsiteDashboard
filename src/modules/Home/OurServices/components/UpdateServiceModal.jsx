import { X } from "lucide-react";
import { UseUpdateService } from "../hooks/UseUpdateService";

const UpdateServiceModal = ({ sh, onClose, id }) => {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handleUpdate,
    isLoading,
    isFetching,
  } = UseUpdateService(id, sh, onClose);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, photo: null });
  };

  if (!sh) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-[15em]">
      <div className="bg-white p-6 rounded-lg w-[70em] shadow-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold">Edit Service</h3>
          <button onClick={() => onClose(false)}>✕</button>
        </div>

        {isFetching ? (
          <p className="text-center py-10">Loading service data...</p>
        ) : (
          <div className="flex flex-row">
            {/* Image Upload */}
            <div className="p-4 w-[30%]">
              <div className="bg-white p-6 shadow-lg rounded-2xl w-full">
                <h2 className="text-xl font-bold text-center mb-4">
                  Service Image
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

            {/* Text Fields */}
            <div className="p-4 w-[70%]">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="input-group">
                  <span className="btn btn-input w-[8em]">Name (EN)</span>
                  <input
                    type="text"
                    placeholder="English Name"
                    value={formData.nameEn}
                    onChange={(e) =>
                      setFormData({ ...formData, nameEn: e.target.value })
                    }
                    className={`input ${errors.nameEn ? "border border-red-500" : ""}`}
                  />
                </div>
                <div className="input-group">
                  <span className="btn btn-input w-[8em]">Name (AR)</span>
                  <input
                    type="text"
                    placeholder="Arabic Name"
                    value={formData.nameAR}
                    onChange={(e) =>
                      setFormData({ ...formData, nameAR: e.target.value })
                    }
                    className={`input ${errors.nameAR ? "border border-red-500" : ""}`}
                  />
                </div>

                {/* Card Description EN */}
                <div className="col-span-1">
                  <label className="block font-medium mb-1">
                    Card Description (EN)
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Enter description in English (80–100 characters)"
                    value={formData.cardDescriptionEN || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        cardDescriptionEN: value,
                      });
                    }}
                    className={`textarea w-full ${
                      !formData.cardDescriptionEN ||
                      (formData.cardDescriptionEN?.length || 0) === 0
                        ? ""
                        : (formData.cardDescriptionEN?.length || 0) < 80
                          ? "border border-red-500"
                          : (formData.cardDescriptionEN?.length || 0) <= 100
                            ? "border border-green-500"
                            : "border border-red-500"
                    }`}
                  ></textarea>
                  <div className="flex justify-between mt-1 text-sm">
                    <span
                      className={`${
                        (formData.cardDescriptionEN?.length || 0) < 80
                          ? "text-red-500"
                          : (formData.cardDescriptionEN?.length || 0) > 100
                            ? "text-red-500"
                            : "text-green-600"
                      }`}
                    >
                      {(formData.cardDescriptionEN?.length || 0) < 80
                        ? `Too short: ${formData.cardDescriptionEN?.length || 0} / 80`
                        : (formData.cardDescriptionEN?.length || 0) > 100
                          ? `Too long: Max 100`
                          : `Perfect length: ${formData.cardDescriptionEN?.length || 0} / 100`}
                    </span>
                    <span className="text-gray-500">
                      {formData.cardDescriptionEN?.length || 0}/100 characters
                    </span>
                  </div>
                </div>

                {/* Card Description AR */}
                <div className="col-span-1">
                  <label className="block font-medium mb-1">
                    Card Description (AR)
                  </label>
                  <textarea
                    rows="5"
                    dir="rtl"
                    placeholder="Enter short Arabic description (80–100 characters)"
                    value={formData.cardDescriptionAR || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        cardDescriptionAR: value,
                      });
                    }}
                    className={`textarea w-full ${
                      !formData.cardDescriptionAR ||
                      (formData.cardDescriptionAR?.length || 0) === 0
                        ? ""
                        : (formData.cardDescriptionAR?.length || 0) < 80
                          ? "border border-red-500"
                          : (formData.cardDescriptionAR?.length || 0) <= 100
                            ? "border border-green-500"
                            : "border border-red-500"
                    }`}
                  ></textarea>
                  <div className="flex justify-between mt-1 text-sm">
                    <span
                      className={`${
                        (formData.cardDescriptionAR?.length || 0) < 80
                          ? "text-red-500"
                          : (formData.cardDescriptionAR?.length || 0) > 100
                            ? "text-red-500"
                            : "text-green-600"
                      }`}
                    >
                      {(formData.cardDescriptionAR?.length || 0) < 80
                        ? `Too short: ${formData.cardDescriptionAR?.length || 0} / 80`
                        : (formData.cardDescriptionAR?.length || 0) > 100
                          ? `Too long: Max 100`
                          : `Perfect length: ${formData.cardDescriptionAR?.length || 0} / 100`}
                    </span>
                    <span className="text-gray-500">
                      {formData.cardDescriptionAR?.length || 0}/100 characters
                    </span>
                  </div>
                </div>
                <div className="col-span-1">
                  <textarea
                    rows="6"
                    placeholder="Description EN"
                    value={formData.descriptionEN}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionEN: e.target.value,
                      })
                    }
                    className={`textarea w-full ${errors.descriptionEN ? "border border-red-500" : ""}`}
                  ></textarea>
                </div>
                <div className="col-span-1">
                  <textarea
                    rows="6"
                    placeholder="Description AR"
                    value={formData.descriptionAR}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionAR: e.target.value,
                      })
                    }
                    className={`textarea w-full ${errors.descriptionAR ? "border border-red-500" : ""}`}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4 gap-4">
          <button className="btn btn-light" onClick={() => onClose(false)}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
