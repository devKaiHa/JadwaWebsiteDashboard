"use client";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { ToastContainer } from "react-toastify";
import { UseUpdateService } from "../hooks/UseUpdateService";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";

const languages = ["en", "ar", "tr"];

function UpdateService() {
  const {
    formData,
    setFormData,
    errors,
    handleUpdate,
    isFetching,
    fetchError,
    isUpdating,
  } = UseUpdateService();

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
                        placeholder={`Enter ${lang.toUpperCase()} name`}
                        type="text"
                        value={formData.name[lang] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: { ...formData.name, [lang]: e.target.value },
                          })
                        }
                        className={`input ${errors[`name${lang.toUpperCase()}`] ? "border border-red-500" : ""}`}
                        disabled={isUpdating}
                      />
                    </div>
                  </td>
                </tr>

                {/* Description */}
                <tr>
                  <td className="p-2 pt-4">
                    <label className="block font-medium mb-1">
                      Card Description ({lang.toUpperCase()})
                    </label>
                    <textarea
                      rows="5"
                      placeholder={`Enter short description in ${lang.toUpperCase()} (80–100 characters)`}
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
                      disabled={isUpdating}
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
  if (isFetching) return <LoadingCard />;
  if (fetchError) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Update Service</h1>
        <div className="flex justify-end">
          <AddButton
            label={isUpdating ? "Updating..." : "Update"}
            onClick={handleUpdate}
            disabled={isUpdating || isFetching}
          />
        </div>
      </div>
      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default UpdateService;
