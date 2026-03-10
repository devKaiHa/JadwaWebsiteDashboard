import React, { useState } from "react";
import { usePostHomeCompanyNameMutation } from "../../../../rtk/Home/companies/CompanyNameApi";
import { toast } from "react-toastify";

const AddCompanyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: { en: "", ar: "", tr: "" },
  });
  const [errors, setErrors] = useState({});

  const [postCompanyName, { isLoading, error }] =
    usePostHomeCompanyNameMutation();

  if (!isOpen) return null;

  const handleChange = (lang, value) => {
    setFormData({
      ...formData,
      name: { ...formData.name, [lang]: value },
    });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name.en) newErrors.en = "Name (EN) is required";
    if (!formData.name.ar) newErrors.ar = "Name (AR) is required";
    if (!formData.name.tr) newErrors.tr = "Name (TR) is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await postCompanyName(formData).unwrap();
      console.log(res);
      toast.success("Company name added successfully");

      setFormData({ name: { en: "", ar: "", tr: "" } }); // reset
      onClose();
    } catch (err) {
      console.error("Failed to add company name:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[600px]">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold">Add a New Company</h3>
          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        {/* Input EN */}
        <div className="input-group mb-3">
          <span className="btn btn-input w-[10.5em]">Name (EN)</span>
          <input
            type="text"
            placeholder="Enter the name in English"
            value={formData.name.en}
            onChange={(e) => handleChange("en", e.target.value)}
            className={`input ${errors.en ? "border border-red-500" : ""} w-full`}
            disabled={isLoading}
          />
        </div>

        {/* Input AR */}
        <div className="input-group mb-3">
          <span className="btn btn-input w-[10.5em]">Name (AR)</span>
          <input
            type="text"
            placeholder="Enter the name in Arabic"
            value={formData.name.ar}
            onChange={(e) => handleChange("ar", e.target.value)}
            className={`input ${errors.ar ? "border border-red-500" : ""} w-full`}
            disabled={isLoading}
          />
        </div>

        {/* Input TR */}
        <div className="input-group mb-3">
          <span className="btn btn-input w-[10.5em]">Name (TR)</span>
          <input
            type="text"
            placeholder="Enter the name in Turkish"
            value={formData.name.tr}
            onChange={(e) => handleChange("tr", e.target.value)}
            className={`input ${errors.tr ? "border border-red-500" : ""} w-full`}
            disabled={isLoading}
          />
        </div>

        {/* Error from server */}
        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error.data?.message || "Something went wrong"}
          </p>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;
