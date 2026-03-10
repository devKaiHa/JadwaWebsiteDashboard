"use client";

import { Container } from "@/components/container";
import Tabs from "../../../components/Global/Tabs";
import AddButton from "../../../components/Global/AddButton";
import UseFundForm from "../hooks/usePostFunds";
import { ToastContainer } from "react-toastify";

const languages = ["en", "ar", "tr"];

const FundAddDashboard = () => {
  const { formData, setFormData, errors, serverError, handlePost, isLoading } =
    UseFundForm();

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

            <div className="input-group">
              <span className="btn btn-input w-[10em]">Title</span>
              <input
                type="text"
                className={`input w-full ${errors[`title_${lang}`] ? "border-red-500" : ""}`}
                placeholder={`Enter title (${lang.toUpperCase()})`}
                value={formData.title[lang]}
                onChange={(e) =>
                  handleLangChange("title", lang, e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[10em]">Subtitle</span>
              <input
                type="text"
                className={`input w-full ${errors[`subtitle_${lang}`] ? "border-red-500" : ""}`}
                placeholder={`Enter subtitle (${lang.toUpperCase()})`}
                value={formData.subtitle[lang]}
                onChange={(e) =>
                  handleLangChange("subtitle", lang, e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[10em]">Overview</span>
              <textarea
                className={`textarea w-full ${errors[`overview_${lang}`] ? "border-red-500" : ""}`}
                rows={3}
                placeholder={`Enter overview (${lang.toUpperCase()})`}
                value={formData.overview[lang]}
                onChange={(e) =>
                  handleLangChange("overview", lang, e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[10em]">Description</span>
              <textarea
                className={`textarea w-full ${errors[`description_${lang}`] ? "border-red-500" : ""}`}
                rows={4}
                placeholder={`Enter description (${lang.toUpperCase()})`}
                value={formData.description[lang]}
                onChange={(e) =>
                  handleLangChange("description", lang, e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[10em]"> Volume</span>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter investment volume"
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
              <div key={idx} className="input-group">
                <label className="btn btn-input w-[10em]">
                  Sector {idx + 1}
                </label>
                <input
                  type="text"
                  className={`input w-full mr-2 ${errors[`sector_${idx}_${lang}`] ? "border-red-500" : ""}`}
                  placeholder={`Enter sector ${idx + 1} (${lang.toUpperCase()})`}
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
          <h3 className="font-bold mb-4">
            Benefits Info ({lang.toUpperCase()})
          </h3>

          {/* Left Column: Titles */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-4">
            <div className="input-group">
              <span className="btn btn-input w-[10em]"> Title</span>
              <input
                type="text"
                className={`input w-full ${errors[`benefitsTitle_${lang}`] ? "border-red-500" : ""}`}
                placeholder={`Enter benefits title (${lang.toUpperCase()})`}
                value={formData.benefitsTitle[lang]}
                onChange={(e) =>
                  handleLangChange("benefitsTitle", lang, e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[10em]"> Subtitle</span>
              <input
                type="text"
                className={`input w-full ${errors[`benefitSubtitle_${lang}`] ? "border-red-500" : ""}`}
                placeholder={`Enter benefits subtitle (${lang.toUpperCase()})`}
                value={formData.benefitSubtitle[lang]}
                onChange={(e) =>
                  handleLangChange("benefitSubtitle", lang, e.target.value)
                }
              />
            </div>
          </div>

          {/* Right Column: Benefits List */}
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
              <div key={idx} className="input-group flex items-center gap-2">
                <label className="btn btn-input w-[10em]">
                  Benefit {idx + 1}
                </label>
                <input
                  type="text"
                  className={`input w-full ${errors[`benefit_${idx}_${lang}`] ? "border-red-500" : ""}`}
                  placeholder={`Enter benefit ${idx + 1} (${lang.toUpperCase()})`}
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

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Add New Fund</h1>
        <div className="flex justify-end">
          <AddButton
            label={isLoading ? "Saving..." : "Save Fund"}
            onClick={handlePost}
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

export default FundAddDashboard;
