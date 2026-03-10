"use client";

import { Container } from "@/components/container";
import AddButton from "@/components/Global/AddButton";
import Tabs from "@/components/Global/Tabs";
import { ToastContainer } from "react-toastify";
import { Alert } from "@/components";
import useUpdateCompany from "../hooks/UseUpdateCompany";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const languages = ["en", "ar", "tr"];

export default function UpdateCompanyDetail() {
  const {
    company,
    setCompany,
    handleImageChange,
    handleUpdate,
    isLoading,
    isFetching,
    isGetError,
    countries,
  } = useUpdateCompany();

  const handleChange = (field, lang, value) => {
    setCompany((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleNestedChange = (parentField, childField, lang, value) => {
    setCompany((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: { ...prev[parentField][childField], [lang]: value },
      },
    }));
  };

  const handleArrayChange = (field, index, lang, value) => {
    const newArray = [...company[field]];
    newArray[index][lang] = value;
    setCompany((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleAddArrayItem = (field) => {
    setCompany((prev) => ({
      ...prev,
      [field]: [...prev[field], { ar: "", en: "", tr: "" }],
    }));
  };

  const handleDeleteArrayItem = (field, index) => {
    const newArray = [...company[field]];
    newArray.splice(index, 1);
    setCompany((prev) => ({ ...prev, [field]: newArray }));
  };
  const tabConfig = [
    {
      key: "general",
      label: "General Information",
      icon: "ki-outline ki-building",
      content: (
        <div className="space-y-6">
          <div className="card p-4 shadow-sm rounded-xl bg-white space-y-4">
            <h3 className="font-semibold text-lg">Company Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["company_logo", "company_logo2", "company_background"].map(
                (field) => (
                  <div
                    key={field}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg"
                  >
                    <span className="text-sm font-medium mb-2">
                      {field.replace(/_/g, " ")}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(field, e.target.files[0])
                      }
                      className="file-input w-full"
                    />
                    {company[field] && (
                      <img
                        src={
                          typeof company[field] === "string"
                            ? company[field]
                            : URL.createObjectURL(company[field])
                        }
                        alt={field}
                        className="mt-2 w-32 h-32 object-cover rounded-lg border"
                      />
                    )}
                  </div>
                )
              )}
            </div>

            <div className="modal-body mt-4">
              <Alert variant="warning" className="capitalize">
                Image size must be less than 2MB.
              </Alert>
            </div>
          </div>

          {languages.map((lang) => (
            <div
              key={lang}
              className="card p-4 shadow-sm rounded-xl bg-white space-y-4 mb-5"
            >
              <h3 className="font-semibold text-lg">
                {lang.toUpperCase()} Info
              </h3>

              <div className="input-group">
                <span className="btn btn-input w-[10.5em]">Company Name </span>
                <input
                  type="text"
                  className="input flex-1"
                  placeholder={`Enter company name in ${lang.toUpperCase()}`}
                  value={company.companyName[lang]}
                  onChange={(e) =>
                    handleChange("companyName", lang, e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[10.5em]">Short About </span>
                <textarea
                  rows="3"
                  className="textarea flex-1"
                  placeholder={`Enter short description in ${lang.toUpperCase()}`}
                  value={company.aboutus[lang]}
                  onChange={(e) =>
                    handleChange("aboutus", lang, e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[10.5em]">Service Title </span>
                <input
                  type="text"
                  className="input flex-1"
                  placeholder={`Enter service title in ${lang.toUpperCase()}`}
                  value={company.serviceTitle[lang]}
                  onChange={(e) =>
                    handleChange("serviceTitle", lang, e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <div className="card p-4 shadow-sm rounded-xl bg-white space-y-4 mb-5">
            <h3 className="font-semibold text-lg">Country Info</h3>

            <div className="input-group">
              <span className="btn btn-input w-[10.5em]">Country</span>
              <select
                className="input flex-1"
                value={company.country || ""}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, country: e.target.value }))
                }
              >
                <option value="" disabled>
                  Select country
                </option>
                {countries?.data?.map((c) => (
                  <option key={c._id} value={company?.country || c.name?.en}>
                    {c.name?.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "about",
      label: "About Company",
      icon: "ki-outline ki-text",
      content: languages.map((lang) => (
        <div
          key={lang}
          className="card p-4 shadow-sm rounded-xl bg-white space-y-4 mb-5"
        >
          <h3 className="font-semibold text-lg">
            About ({lang.toUpperCase()})
          </h3>
          <textarea
            rows="4"
            className="textarea w-full"
            placeholder={`Write about the company in ${lang.toUpperCase()}`}
            value={company.about[lang]}
            onChange={(e) => handleChange("about", lang, e.target.value)}
          />
        </div>
      )),
    },
    {
      key: "missionVision",
      label: "Mission & Vision",
      icon: "ki-outline ki-target",
      content: languages.map((lang) => (
        <div
          key={lang}
          className="card p-4 shadow-sm rounded-xl bg-white space-y-4 mb-5"
        >
          <h3 className="font-semibold text-lg">
            Mission & Vision ({lang.toUpperCase()})
          </h3>
          <div className="input-group">
            <span className="btn btn-input w-[10.5em]">Mission</span>
            <textarea
              rows="3"
              className="textarea flex-1"
              placeholder={`Enter mission in ${lang.toUpperCase()}`}
              value={company.mission[lang]}
              onChange={(e) => handleChange("mission", lang, e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="btn btn-input w-[10.5em]">Vision</span>
            <textarea
              rows="3"
              className="textarea flex-1"
              placeholder={`Enter vision in ${lang.toUpperCase()}`}
              value={company.vision[lang]}
              onChange={(e) => handleChange("vision", lang, e.target.value)}
            />
          </div>
        </div>
      )),
    },
    {
      key: "experience",
      label: "Experience",
      icon: "ki-outline ki-briefcase",
      content: (
        <div className="card p-4 shadow-sm rounded-xl bg-white space-y-4">
          <h3 className="font-semibold text-lg">Experience</h3>
          <div className="input-group">
            <span className="btn btn-input w-[10.5em]">Years</span>
            <input
              type="number"
              className="input flex-1"
              placeholder="Enter number of years of experience"
              value={company.Experience}
              onChange={(e) =>
                setCompany((prev) => ({ ...prev, Experience: e.target.value }))
              }
            />
          </div>
          {languages.map((lang) => (
            <div key={lang} className="input-group">
              <span className="btn btn-input w-[10.5em]">
                Field ({lang.toUpperCase()})
              </span>
              <input
                type="text"
                className="input flex-1"
                placeholder={`Enter experience field in ${lang.toUpperCase()}`}
                value={company.ExperienceField[lang]}
                onChange={(e) =>
                  handleChange("ExperienceField", lang, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "introduction",
      label: "Introduction",
      icon: "ki-outline ki-info",
      content: (
        <div className="space-y-6">
          {languages.map((lang) => (
            <div key={lang} className="card p-4 shadow-sm rounded-xl bg-white">
              <h3 className="font-semibold text-lg mb-4">
                Introduction Title ({lang.toUpperCase()})
              </h3>
              <div className="input-group">
                <span className="btn btn-input w-[10.5em]">Title</span>
                <input
                  type="text"
                  className="input flex-1"
                  placeholder={`Enter introduction title in ${lang.toUpperCase()}`}
                  value={company.introduction.title[lang]}
                  onChange={(e) =>
                    handleNestedChange(
                      "introduction",
                      "title",
                      lang,
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}

          {company.introduction.array.map((item, idx) => (
            <div
              key={idx}
              className="card p-4 shadow-sm rounded-xl bg-white space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  Introduction Point {idx + 1}
                </h3>
                {company.introduction.array.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-danger"
                    onClick={() => {
                      const newArray = [...company.introduction.array];
                      newArray.splice(idx, 1);
                      setCompany((prev) => ({
                        ...prev,
                        introduction: { ...prev.introduction, array: newArray },
                      }));
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>
              {languages.map((lang) => (
                <div key={lang} className="input-group">
                  <span className="btn btn-input w-[7em]">
                    Text ({lang.toUpperCase()})
                  </span>
                  <input
                    type="text"
                    className="input flex-1"
                    placeholder={`Enter text in ${lang.toUpperCase()}`}
                    value={item[lang]}
                    onChange={(e) => {
                      const newArray = [...company.introduction.array];
                      newArray[idx][lang] = e.target.value;
                      setCompany((prev) => ({
                        ...prev,
                        introduction: { ...prev.introduction, array: newArray },
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline btn-primary"
            onClick={() =>
              setCompany((prev) => ({
                ...prev,
                introduction: {
                  ...prev.introduction,
                  array: [
                    ...prev.introduction.array,
                    { ar: "", en: "", tr: "" },
                  ],
                },
              }))
            }
          >
            + Add Introduction Point
          </button>
        </div>
      ),
    },
    {
      key: "goals",
      label: "Goals",
      icon: "ki-outline ki-flag",
      content: (
        <div className="space-y-6">
          {company.goals.map((goal, idx) => (
            <div
              key={idx}
              className="card p-4 shadow-sm rounded-xl bg-white space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Goal {idx + 1}</h3>
                {company.goals.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-danger"
                    onClick={() => handleDeleteArrayItem("goals", idx)}
                  >
                    DELETE
                  </button>
                )}
              </div>
              {languages.map((lang) => (
                <div key={lang} className="input-group">
                  <span className="btn btn-input w-[8em]">
                    Goal ({lang.toUpperCase()})
                  </span>
                  <input
                    type="text"
                    className="input flex-1"
                    placeholder={`Enter goal in ${lang.toUpperCase()}`}
                    value={goal[lang]}
                    onChange={(e) =>
                      handleArrayChange("goals", idx, lang, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => handleAddArrayItem("goals")}
          >
            + Add Goal
          </button>
        </div>
      ),
    },
    {
      key: "strategic",
      label: "Strategic",
      icon: "ki-outline ki-star",
      content: languages.map((lang) => (
        <div
          key={lang}
          className="card p-4 shadow-sm rounded-xl bg-white space-y-4 mb-5"
        >
          <h3 className="font-semibold text-lg">
            Strategic ({lang.toUpperCase()})
          </h3>
          <div className="input-group">
            <span className="btn btn-input w-[10.5em]">Title</span>
            <input
              type="text"
              className="input flex-1"
              placeholder={`Enter strategic title in ${lang.toUpperCase()}`}
              value={company.stratgicTitle[lang]}
              onChange={(e) =>
                handleChange("stratgicTitle", lang, e.target.value)
              }
            />
          </div>
          <div className="input-group">
            <span className="btn btn-input w-[10.5em]">Sub Title</span>
            <input
              type="text"
              className="input flex-1"
              placeholder={`Enter strategic sub title in ${lang.toUpperCase()}`}
              value={company.stratgicSubTitle[lang]}
              onChange={(e) =>
                handleChange("stratgicSubTitle", lang, e.target.value)
              }
            />
          </div>
        </div>
      )),
    },
    {
      key: "social",
      label: "Social Links",
      icon: "ki-outline ki-link",
      content: (
        <div className="card p-4 shadow-sm rounded-xl bg-white space-y-4">
          <h3 className="font-semibold text-lg">Social Links</h3>
          {["x", "instagram", "facebook", "linkedin"].map((platform) => (
            <div key={platform} className="input-group">
              <span className="btn btn-input w-[10.5em]">
                {platform.toUpperCase()}
              </span>
              <input
                type="text"
                className="input flex-1"
                placeholder={`Enter ${platform} link`}
                value={company.social_links[platform]}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    social_links: {
                      ...prev.social_links,
                      [platform]: e.target.value,
                    },
                  }))
                }
              />
            </div>
          ))}
        </div>
      ),
    },
  ];
  if (isFetching) return <LoadingCard />;
  if (isGetError) return <ErrorMessageCard />;
  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold">Update Company</h1>
        <AddButton label="Save" onClick={handleUpdate} disabled={isLoading} />
      </div>

      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
}
