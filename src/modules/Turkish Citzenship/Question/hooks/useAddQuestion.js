import { useState, useEffect } from "react";
import { usePostQuestionMutation } from "../../../../rtk/Turkish Citzenship/Question/questionApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAddQuestion = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    questions: { ar: "", en: "", tr: "" },
    answers: { ar: "", en: "", tr: "" }, // 👈 هنا سنطبق شرط 200 محرف
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postQuestion, { isLoading, error }] = usePostQuestionMutation();

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    // السؤال بدون شرط طول
    ["en", "ar", "tr"].forEach((lang) => {
      if (!formData.questions[lang]?.trim()) {
        newErrors[`questions${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Question (${lang.toUpperCase()}) is required`;
      }
    });

    // ✅ الجواب مع شرط 200 محرف
    ["en", "ar", "tr"].forEach((lang) => {
      const val = formData.answers[lang]?.trim() || "";
      if (!val) {
        newErrors[`answers${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Answer (${lang.toUpperCase()}) is required`;
      }
    });

    setErrors(newErrors);

    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleAdd = async () => {
    if (!validate()) return;

    try {
      await postQuestion(formData).unwrap();
      toast.success("Question added successfully!");
      reset();

      setTimeout(() => {
        navigate("/turkish-questions");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error adding question:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the question. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  // ✅ Reset form
  const reset = () => {
    setFormData({
      questions: { ar: "", en: "", tr: "" },
      answers: { ar: "", en: "", tr: "" },
    });
    setErrors({});
    setServerError("");
  };

  useEffect(() => {
    if (error) {
      const message = "Server error occurred";
      setServerError(message);
      toast.error(message);
    }
  }, [error]);

  return {
    formData,
    setFormData,
    errors,
    serverError,
    handleAdd,
    isLoading,
  };
};

export default useAddQuestion;
