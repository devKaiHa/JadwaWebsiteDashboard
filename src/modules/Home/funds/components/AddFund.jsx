"use client";
import { useState } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { UseAddFund } from "../hooks/usePostFunds";
import { ToastContainer } from "react-toastify";

const languages = ["en", "ar", "tr"];

function AddFund() {
  const { formData, setFormData, errors, handlePost, isLoading } = UseAddFund();

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
        <div className="flex-1 card">
          <div className="card-header flex items-center justify-between">
            <h3 className="card-title">
              {lang === "ar"
                ? "Arabic Information"
                : lang === "en"
                  ? "English Information"
                  : "Turkish Information"}
            </h3>
          </div>

          <div className="card-table scrollable-x-auto pb-3">
            <table className="table-auto w-full text-sm text-gray-600">
              <tbody>
                {/* Name */}
                <tr>
                  <td className="p-2 pt-4">
                    <div className="input-group">
                      <span className="btn btn-input w-[10.5em]">
                        Title ({lang.toUpperCase()})
                      </span>
                      <input
                        placeholder={`Enter title in ${lang.toUpperCase()}`}
                        type="text"
                        value={formData.name[lang] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: { ...formData.name, [lang]: e.target.value },
                          })
                        }
                        className={`input ${errors[`name${lang.toUpperCase()}`] ? "border border-red-500" : ""}`}
                        disabled={isLoading}
                      />
                    </div>
                  </td>
                </tr>

                {/* Investment */}
                <tr>
                  <td className="p-2 pt-4">
                    <div className="input-group">
                      <span className="btn btn-input w-[10.5em]">
                        Investment ({lang.toUpperCase()})
                      </span>
                      <input
                        placeholder={`Enter investment in ${lang.toUpperCase()}`}
                        type="text"
                        value={formData.investment[lang] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            investment: {
                              ...formData.investment,
                              [lang]: e.target.value,
                            },
                          })
                        }
                        className={`input ${errors[`investment${lang.toUpperCase()}`] ? "border border-red-500" : ""}`}
                        disabled={isLoading}
                      />
                    </div>
                  </td>
                </tr>

                {/* Description */}
                <tr>
                  <td className="p-2 pt-4">
                    <label className="block font-medium mb-1">
                      Description ({lang.toUpperCase()})
                    </label>
                    <textarea
                      rows="5"
                      placeholder={`Enter short description in ${lang.toUpperCase()} (80–100 chars)`}
                      value={formData.description[lang] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            [lang]: value,
                          },
                        });
                      }}
                      className={`textarea w-full ${errors[`description${lang.toUpperCase()}`] ? "border border-red-500" : ""}`}
                    ></textarea>
                    <div className="flex justify-between mt-1 text-sm">
                      <span
                        className={
                          getDescStatus(formData.description[lang]).color
                        }
                      >
                        {getDescStatus(formData.description[lang]).msg}
                      </span>
                      <span className="text-gray-500">
                        {formData.description[lang]?.length || 0}/500 characters
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Add Fund</h1>
        <div className="flex justify-end">
          <AddButton label="Save" onClick={handlePost} disabled={isLoading} />
        </div>
      </div>
      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default AddFund;
