"use client";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { ToastContainer } from "react-toastify";
import useEditQuestion from "../hooks/useUpdateQuestion.js";
import LoadingCard from "../../../../components/Global/LoadingCard.jsx";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard.jsx";
const languages = ["en", "ar", "tr"];

function EditQuestion() {
  const {
    formData,
    setFormData,
    errors,
    handleUpdate,
    isFetching,
    isError,
    isLoading,
  } = useEditQuestion();

  const getTextStatus = (text = "", max = 500) => {
    if (!text.trim()) return { color: "text-red-500", msg: "Required" };
    if (text.length > max)
      return { color: "text-red-500", msg: `Too long: ${text.length}/${max}` };
    return {
      color: "text-green-600",
      msg: `Length: ${text.length}/${max}`,
    };
  };

  if (isFetching) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    icon: "ki-outline ki-translate",
    content: (
      <div className="flex flex-col gap-6">
        {/* Question */}
        <div className="card p-4">
          <label className="block font-medium mb-1">
            Question ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            placeholder={`Enter ${lang.toUpperCase()} Question`}
            value={formData.questions[lang] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                questions: { ...formData.questions, [lang]: e.target.value },
              })
            }
            className={`input w-full ${
              errors[`questions${lang.toUpperCase()}`]
                ? "border border-red-500"
                : ""
            }`}
            disabled={isLoading}
          />
        </div>

        {/* ✅ Answer مع شرط 500 محرف */}
        <div className="card p-4">
          <label className="block font-medium mb-1">
            Answer ({lang.toUpperCase()})
          </label>
          <textarea
            rows="5"
            placeholder={`Enter ${lang.toUpperCase()} Answer (max 500 chars)`}
            value={formData.answers[lang] || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                answers: { ...formData.answers, [lang]: value },
              });
            }}
            className={`textarea w-full ${
              errors[`answers${lang.toUpperCase()}`]
                ? "border border-red-500"
                : ""
            }`}
          />
          <div className="flex justify-between mt-1 text-sm">
            <span className={getTextStatus(formData.answers[lang]).color}>
              {getTextStatus(formData.answers[lang]).msg}
            </span>
            <span className="text-gray-500">
              {formData.answers[lang]?.length || 0}/500
            </span>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Edit Question</h1>
        <div className="flex justify-end">
          <AddButton
            label="Update"
            onClick={handleUpdate}
            disabled={isLoading}
          />
        </div>
      </div>

      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default EditQuestion;
