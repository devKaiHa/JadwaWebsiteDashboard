import { useState, useEffect } from "react";
import {
  useUpdateQuestionMutation,
  useGetOneQuestionQuery,
} from "../../../../rtk/Turkish Citzenship/Question/questionApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export const useEditQuestion = (onClose) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: questionData,
    isLoading: isFetching,
    error: fetchError,
    isError,
  } = useGetOneQuestionQuery(id);

  const [formData, setFormData] = useState({
    questions: { ar: "", en: "", tr: "" },
    answers: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [updateQuestion, { isLoading, error }] = useUpdateQuestionMutation();

  useEffect(() => {
    if (questionData?.data) {
      setFormData({
        questions: {
          ar: questionData.data.questions?.ar || "",
          en: questionData.data.questions?.en || "",
          tr: questionData.data.questions?.tr || "",
        },
        answers: {
          ar: questionData.data.answers?.ar || "",
          en: questionData.data.answers?.en || "",
          tr: questionData.data.answers?.tr || "",
        },
      });
    }
  }, [questionData]);

  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    ["en", "ar", "tr"].forEach((lang) => {
      if (!formData.questions[lang]?.trim()) {
        newErrors[`questions${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Question (${lang.toUpperCase()}) is required`;
      }
    });

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

  // Submit Update
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      await updateQuestion({ id, formData }).unwrap();
      toast.success("Question updated successfully!");
      setTimeout(() => {
        navigate("/turkish-questions");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error updating question:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while updating the question. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    if (fetchError) {
      toast.error("Error fetching question data.");
    }
  }, [fetchError]);

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
    handleUpdate,
    isLoading,
    isFetching,
    isError,
    isFetching,
  };
};

export default useEditQuestion;
