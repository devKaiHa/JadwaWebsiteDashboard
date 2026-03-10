import { useState, useEffect } from "react";
import { usePostServiceMutation } from "../../../../rtk/Service/ServiceApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const UsePostService = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [postService, { isLoading, isSuccess, error }] =
    usePostServiceMutation();

  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
    let isWarning = false;

    const checkField = (field, lang, text) => {
      if (!text.trim()) {
        newErrors[`${field}${lang.toUpperCase()}`] = true;
        if (!firstMessage) {
          firstMessage = `${field} (${lang.toUpperCase()}) is required`;
          isWarning = false;
        }
      } else if (field === "description") {
        if (text.length < 1) {
          newErrors[`${field}${lang.toUpperCase()}`] = true;
          if (!firstMessage) {
            firstMessage = `${field} (${lang.toUpperCase()}) is too short: ${text.length}/1`;
            isWarning = true;
          }
        }
      }
    };

    ["en", "ar", "tr"].forEach((lang) => {
      checkField("name", lang, formData.name[lang]);
      checkField("description", lang, formData.description[lang]);
    });

    setErrors(newErrors);

    if (firstMessage) {
      if (isWarning) toast.warning(firstMessage);
      else toast.error(firstMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async () => {
    if (!validate()) return;

    try {
      const res = await postService(formData).unwrap();
      toast.success("Service added successfully!");
      reset();
      if (onClose) onClose(false);

      setTimeout(() => {
        navigate("/all-services");
      }, 2000);
    } catch (err) {
      console.error("Error adding service:", err);

      const errorMessage = err?.data?.includes("ValidationError")
        ? "All fields are required in all languages"
        : "Failed to add service. Please try again.";

      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const reset = () => {
    setFormData({
      name: { ar: "", en: "", tr: "" },
      description: { ar: "", en: "", tr: "" },
    });
    setErrors({});
    setServerError("");
  };

  useEffect(() => {
    if (isSuccess && onClose) onClose(false);
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setServerError("Server error occurred");
      toast.error("Server error occurred");
    }
  }, [error]);

  return {
    formData,
    setFormData,
    errors,
    serverError,
    handlePost,
    isLoading,
  };
};
