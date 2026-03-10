"use client";

import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { ToastContainer } from "react-toastify";
import { useAddService } from "../hooks/useAddService";

const languages = ["en", "ar", "tr"];

function AddTurkishService() {
  const { formData, setFormData, errors, handleAdd, isLoading } =
    useAddService();

  // ✅ حالة النص للوصف القصير لكل لغة
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
    icon: "ki-outline ki-translate",
    content: (
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="card p-4">
          <label className="block font-medium mb-1">
            Title ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            placeholder={`Enter ${lang.toUpperCase()} Title`}
            value={formData.title[lang] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: { ...formData.title, [lang]: e.target.value },
              })
            }
            className={`input w-full ${
              errors[`title${lang.toUpperCase()}`]
                ? "border border-red-500"
                : ""
            }`}
            disabled={isLoading}
          />
        </div>

        {/* Short Description */}
        <div className="card p-4">
          <label className="block font-medium mb-1">
            Short Description ({lang.toUpperCase()})
          </label>
          <textarea
            rows="5"
            placeholder={`Enter short description in ${lang.toUpperCase()} (80–100 chars)`}
            value={formData.shortDescriptopn[lang] || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                shortDescriptopn: {
                  ...formData.shortDescriptopn,
                  [lang]: value,
                },
              });
            }}
            className={`textarea w-full ${
              errors[`shortDescriptopn${lang.toUpperCase()}`]
                ? "border border-red-500"
                : ""
            }`}
          />
          <div className="flex justify-between mt-1 text-sm">
            <span
              className={getDescStatus(formData.shortDescriptopn[lang]).color}
            >
              {getDescStatus(formData.shortDescriptopn[lang]).msg}
            </span>
            <span className="text-gray-500">
              {formData.shortDescriptopn[lang]?.length || 0}/500
            </span>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Add Turkish Service</h1>
        <div className="flex justify-end">
          <AddButton label="Save" onClick={handleAdd} disabled={isLoading} />
        </div>
      </div>

      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default AddTurkishService;
