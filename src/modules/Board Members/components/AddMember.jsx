// AddEmployee.js
"use client";
import { Container } from "@/components/container";
import AddButton from "../../../components/Global/AddButton";
import Tabs from "../../../components/Global/Tabs";
import { X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { Alert } from "@/components";
import UsePostEmployee from "../hooks/UseAddEmployee.js";
import { FormControlLabel, Switch } from "@mui/material";

const languages = ["en", "ar", "tr"];

function AddEmployee() {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handlePost,
    isLoading,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
  } = UsePostEmployee();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
      e.target.value = "";
    }
  };

  const removeImage = () => handleImageChange(null);

  const getDescStatus = (text = "") => {
    if (text.length < 1)
      return { color: "text-red-500", msg: `Too short: ${text.length} / 1` };
    if (text.length > 500)
      return { color: "text-red-500", msg: "Too long: Max 500" };
    return {
      color: "text-green-600",
      msg: `Perfect length: ${text.length} / 500`,
    };
  };

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
                className={`input w-full ${errors[`name_${lang}`] ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
          </div>
          {/* Position */}
          <div className="mb-4">
            <div className="input-group">
              <span className="btn btn-input w-[8em]">Position</span>
              <input
                type="text"
                placeholder={`Enter ${lang.toUpperCase()} Position`}
                value={formData?.position[lang]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    position: { ...prev.position, [lang]: e.target.value },
                  }))
                }
                className={`input w-full ${errors[`position_${lang}`] ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
          </div>
          {/* Bio */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              rows={4}
              placeholder="Enter description (30–80 chars)"
              value={formData?.bio[lang]}
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  bio: { ...prev.bio, [lang]: val },
                }));
              }}
              className={`textarea w-full ${errors[`bio_${lang}`] ? "border border-red-500" : ""}`}
            />
            <div className="flex justify-between mt-1 text-sm">
              <span className={getDescStatus(formData?.bio[lang]).color}>
                {getDescStatus(formData?.bio[lang]).msg}
              </span>
              <span className="text-gray-500">
                {formData?.bio[lang]?.length || 0}/500
              </span>
            </div>
          </div>
          <div className="mb-4">
            <div className="input-group">
              <span className="btn btn-input w-[8em]">Nationality</span>
              <input
                type="text"
                placeholder={`Enter ${lang.toUpperCase()} Nationality`}
                value={formData?.nationality[lang]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nationality: {
                      ...prev.nationality,
                      [lang]: e.target.value,
                    },
                  }))
                }
                className={`input w-full ${errors[`nationality_${lang}`] ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="btn btn-input w-[8em]">Address</span>
              <input
                type="text"
                placeholder={`Enter ${lang.toUpperCase()} Address`}
                value={formData?.address[lang]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, [lang]: e.target.value },
                  }))
                }
                className={`input w-full ${errors[`address_${lang}`] ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Education</label>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Education #${idx + 1}`}
                  value={edu[lang]}
                  onChange={(e) =>
                    handleArrayChange("education", idx, lang, e.target.value)
                  }
                  className="input w-full"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("education", idx)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("education", lang)}
              className="btn btn-primary mt-1"
            >
              Add Education
            </button>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">
              Professional Experience
            </label>
            {formData.professionalExperience.map((exp, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Experience #${idx + 1}`}
                  value={exp[lang]} // current language
                  onChange={(e) =>
                    handleArrayChange(
                      "professionalExperience",
                      idx,
                      lang,
                      e.target.value,
                    )
                  }
                  className="input w-full"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("professionalExperience", idx)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("professionalExperience")}
              className="btn btn-primary mt-1"
            >
              Add Experience
            </button>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-8">
        <h1 className="text-2xl font-bold">Add Board Member</h1>
        <AddButton label="Save" onClick={handlePost} disabled={isLoading} />
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
                alt="Employee"
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

          {/* Contact Info Card */}
          <div className="bg-white p-6 shadow-lg rounded-2xl w-full space-y-4">
            <h2 className="text-lg font-bold text-center mb-4">
              Contact Information
            </h2>

            <div className="flex items-center gap-2">
              <FormControlLabel
                control={
                  <Switch
                    checked={formData?.isFounder}
                    onChange={(e) =>
                      setFormData({ ...formData, isFounder: e.target.checked })
                    }
                    disabled={isLoading}
                    name="isFounder"
                  />
                }
                labelPlacement="start"
                label="Is Founder"
              />
              <span>{formData?.isFounder ? "Yes" : "No"}</span>
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[8em]">Email</span>
              <input
                type="email"
                placeholder="Enter Email"
                value={formData?.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`input ${errors.email ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[8em]">Phone</span>
              <input
                type="text"
                placeholder="Enter Phone"
                value={formData?.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`input ${errors.phone ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[8em]">website</span>
              <input
                type="url"
                placeholder="Enter website URL"
                value={formData?.website || ""}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className={`input ${errors.website ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>

            {/* Date of Birth */}
            <div className="input-group">
              <span className="btn btn-input w-[8em]">Date of birth</span>
              <input
                type="date"
                value={formData?.birthDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className={`input ${errors.birthDate ? "border border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
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

export default AddEmployee;
