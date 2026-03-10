"use client";

import { Container } from "@/components/container";
import Tabs from "../../../components/Global/Tabs";
import AddButton from "../../../components/Global/AddButton";
import { ToastContainer } from "react-toastify";
import UseFundUpdate from "../hooks/useUpdateFunds";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const languages = ["en", "ar", "tr"];

const FundUpdateDashboard = () => {
  const {
    formData,
    setFormData,
    errors,
    serverError,
    handleUpdate,
    isLoading,
    isError,
  } = UseFundUpdate();

  const handleLangChange = (section, lang, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [lang]: value },
    });
  };

  const handleArrayAdd = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], { ar: "", en: "", tr: "" }],
    });
  };

  const handleArrayChange = (field, index, lang, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index][lang] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleArrayRemove = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    content: (
      <div className="flex flex-col gap-6">
        {/* ====== Fund Info + Sectors Horizontal Layout ====== */}
        <div className="flex gap-6 flex-wrap">
          {/* Fund Info */}
          <div className="card p-4 flex-1 min-w-[300px] flex flex-col gap-4">
            <h3 className="font-bold mb-4">Fund Info ({lang.toUpperCase()})</h3>

            {["title", "subtitle", "overview", "description"].map((field) => (
              <div key={field} className="input-group">
                <span className="btn btn-input w-[10em]">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </span>
                {field === "overview" || field === "description" ? (
                  <textarea
                    className={`textarea w-full ${errors[`${field}_${lang}`] ? "border-red-500" : ""}`}
                    rows={field === "description" ? 4 : 3}
                    value={formData[field][lang]}
                    onChange={(e) =>
                      handleLangChange(field, lang, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    className={`input w-full ${errors[`${field}_${lang}`] ? "border-red-500" : ""}`}
                    value={formData[field][lang]}
                    onChange={(e) =>
                      handleLangChange(field, lang, e.target.value)
                    }
                  />
                )}
              </div>
            ))}

            <div className="input-group">
              <span className="btn btn-input w-[10em]">Volume</span>
              <input
                type="text"
                className="input w-full"
                value={formData.investmentVolume}
                onChange={(e) =>
                  setFormData({ ...formData, investmentVolume: e.target.value })
                }
              />
            </div>
          </div>

          {/* Sectors */}
          <div className="card p-4 flex-1 min-w-[250px] flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Sectors ({lang.toUpperCase()})</h3>
              <span
                className="badge badge-primary cursor-pointer badge-outline rounded-full w-[3em] h-[3em] text-center"
                onClick={() => handleArrayAdd("sectors")}
              >
                +
              </span>
            </div>
            {formData.sectors.map((sector, idx) => (
              <div key={idx} className="input-group flex items-center ">
                <span className="btn btn-input w-[10em]">Sector {idx + 1}</span>
                <input
                  type="text"
                  className={`input w-full ${errors[`sector_${idx}_${lang}`] ? "border-red-500" : ""} mr-2`}
                  value={sector[lang]}
                  onChange={(e) =>
                    handleArrayChange("sectors", idx, lang, e.target.value)
                  }
                />
                {formData.sectors.length > 1 && (
                  <span
                    className="badge badge-danger cursor-pointer badge-outline rounded-full w-[3em] h-[3em]"
                    onClick={() => handleArrayRemove("sectors", idx)}
                  >
                    -
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ====== Benefits Section Horizontal Layout ====== */}
        <div className="card p-4 flex gap-6 flex-wrap">
          {/* Titles */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-4">
            {["benefitsTitle", "benefitSubtitle"].map((field) => (
              <div key={field} className="input-group">
                <span className="btn btn-input w-[10em]">{field}</span>
                <input
                  type="text"
                  className={`input w-full ${errors[`${field}_${lang}`] ? "border-red-500" : ""}`}
                  value={formData[field][lang]}
                  onChange={(e) =>
                    handleLangChange(field, lang, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* Benefits List */}
          <div className="flex-1 min-w-[250px] flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Benefits List</h4>
              <span
                className="badge badge-primary cursor-pointer badge-outline rounded-full w-[3em] h-[3em] text-center"
                onClick={() => handleArrayAdd("benefits")}
              >
                +
              </span>
            </div>
            {formData.benefits.map((benefit, idx) => (
              <div key={idx} className="input-group flex items-center ">
                <span className="btn btn-input w-[10em]">
                  Benefit {idx + 1}
                </span>
                <input
                  type="text"
                  className={`input w-full ${errors[`benefit_${idx}_${lang}`] ? "border-red-500" : ""} mr-2`}
                  value={benefit[lang]}
                  onChange={(e) =>
                    handleArrayChange("benefits", idx, lang, e.target.value)
                  }
                />
                {formData.benefits.length > 1 && (
                  <span
                    className="badge badge-danger cursor-pointer badge-outline rounded-full w-[3em] h-[3em]"
                    onClick={() => handleArrayRemove("benefits", idx)}
                  >
                    -
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }));
  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;
  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Update Fund</h1>
        <div className="flex justify-end">
          <AddButton
            label={isLoading ? "Updating..." : "Update Fund"}
            onClick={handleUpdate}
          />
        </div>
      </div>

      {serverError && (
        <p className="text-red-500 font-medium mb-4">{serverError}</p>
      )}

      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default FundUpdateDashboard;
