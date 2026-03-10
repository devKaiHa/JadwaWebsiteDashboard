"use client";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { useUpdateInvestService } from "../hooks/useUpdateInvest"; 
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";

const languages = ["ar", "en", "tr"];

const UpdateInvestService = () => {
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
  } = useUpdateInvestService(id);

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
                {/* Title */}
                <tr>
                  <td className="p-2 pt-4">
                    <div className="input-group">
                      <span className="btn btn-input w-[8em]">Title ({lang.toUpperCase()})</span>
                      <input
                        type="text"
                        value={formData.title[lang] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: { ...formData.title, [lang]: e.target.value },
                          })
                        }
                        className={`input ${
                          errors[`title${lang.toUpperCase()}`] ? "border border-red-500" : ""
                        }`}
                        disabled={isFetching || isUpdating}
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
                      value={formData.description[lang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, [lang]: e.target.value },
                        })
                      }
                      className={`textarea w-full ${
                        errors[`description${lang.toUpperCase()}`] ? "border border-red-500" : ""
                      }`}
                      disabled={isFetching || isUpdating}
                    ></textarea>
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

export default UpdateInvestService;
