"use client";
import { Container } from "@/components/container";
import AddButton from "../../../components/Global/AddButton";
import Tabs from "../../../components/Global/Tabs";
import { X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { Alert } from "@/components";
import UseAddInvestPortfolio from "../hooks/UseAddInvestPortfolio.js";

const languages = ["en", "ar", "tr"];

function AddInvestPortfolio() {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    handleSubmit,
    isLoading,
  } = UseAddInvestPortfolio();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
      e.target.value = "";
    }
  };

  const removeImage = () => handleImageChange(null);

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    content: (
      <div className="flex flex-col gap-4">
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-4">
            {lang === "ar"
              ? "Arabic Information"
              : lang === "en"
                ? "English Information"
                : "Turkish Information"}
          </h3>

          {/* Name */}
          <div className="mb-4">
            <div className="input-group">
              <span className="btn btn-input w-[8em]">Name</span>
              <input
                type="text"
                placeholder={`Enter ${lang.toUpperCase()} Name`}
                value={formData?.name[lang]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: { ...prev.name, [lang]: e.target.value },
                  }))
                }
                className={`input w-full`}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows={4}
              placeholder={`Enter ${lang.toUpperCase()} description`}
              value={formData?.description[lang]}
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  description: { ...prev.description, [lang]: val },
                }));
              }}
              className={`textarea w-full`}
            />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-8">
        <h1 className="text-2xl font-bold">Add Investment Portfolio</h1>
        <AddButton label="Save" onClick={handleSubmit} disabled={isLoading} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Image + Contact Info + Personal Info */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Image Card */}
          <div className="bg-white p-6 shadow-lg rounded-2xl w-full">
            <h2 className="text-xl font-bold text-center mb-4">Add an image</h2>
            <div className="w-full h-52 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <img
                src={preview || "/public/assets/service-detailes.jpg"}
                alt="Investment Portfolio"
                className="object-contain h-full w-full"
              />
            </div>

            {formData?.img && preview && (
              <div className="flex justify-end mt-2">
                <button type="button" onClick={removeImage}>
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
          <div className="modal-body mt-2">
            <Alert variant="warning" className="capitalize">
              Image size must be less than 2MB.
            </Alert>
          </div>
        </div>

        {/* Right Column: Tabs */}
        <div className="w-full md:w-2/3">
          <Tabs tabs={tabConfig} />
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default AddInvestPortfolio;
