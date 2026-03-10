"use client";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { useUpdateValue } from "../hooks/useUpdateValues";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";

const languages = ["en", "ar", "tr"];

const UpdateValue = () => {
  const { id } = useParams();
  const {
    formData,
    setFormData,
    errors,
    handleUpdate,
    isFetching,
    isError,
    isUpdating,
    refetch,
  } = useUpdateValue(id);

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
                      <span className="btn btn-input w-[8em]">
                        Name ({lang.toUpperCase()})
                      </span>
                      <input
                        type="text"
                        value={formData.name[lang] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: { ...formData.name, [lang]: e.target.value },
                          })
                        }
                        className={`input ${
                          errors[`name${lang.toUpperCase()}`]
                            ? "border border-red-500"
                            : ""
                        }`}
                        disabled={isFetching || isUpdating}
                      />
                    </div>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td className="p-2 pt-4">
                    <label className="block font-medium mb-1">
                      Content ({lang.toUpperCase()})
                    </label>
                    <textarea
                      rows="4"
                      value={formData.content[lang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            [lang]: e.target.value,
                          },
                        })
                      }
                      className={`textarea w-full ${
                        errors[`content${lang.toUpperCase()}`]
                          ? "border border-red-500"
                          : ""
                      }`}
                      disabled={isFetching || isUpdating}
                    ></textarea>
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
                      className={`textarea w-full ${
                        errors[`description${lang.toUpperCase()}`]
                          ? "border border-red-500"
                          : ""
                      }`}
                      disabled={isFetching || isUpdating}
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
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="flex justify-end mb-5">
        <AddButton
          label="Save Changes"
          onClick={handleUpdate}
          disabled={isFetching || isUpdating}
        />
      </div>
      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateValue;
