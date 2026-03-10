import { useState, useEffect } from "react";
import { usePostValuesMutation } from "../../../../rtk/Home/values/valuesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const UseValues = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    valuesTitle: "68bee3e2162679e28b2f8bf2",
    name: { ar: "", en: "", tr: "" },
    content: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postValue, { isLoading, isSuccess, error }] = usePostValuesMutation();

  // Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";
    const len = (t = "") => t.length;

    ["en", "ar", "tr"].forEach((lang) => {
      // Name validation
      if (!formData.name[lang].trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
      }

      // Content validation
      if (!formData.content[lang].trim()) {
        newErrors[`content${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Content (${lang.toUpperCase()}) is required`;
      }

      // Description validation
      const desc = formData.description[lang];
      if (!desc || desc.trim() === "") {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is required`;
      } else if (len(desc) < 1) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too short: ${len(
            desc
          )}/1`;
      }
    });

    setErrors(newErrors);

    // Toast notifications
    if (firstErrorMessage) {
      if (firstErrorMessage.includes("required")) {
        toast.error(firstErrorMessage);
      } else {
        toast.warning(firstErrorMessage);
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handlePost = async () => {
    if (!validate()) return;

    try {
      const payload = {
        valuesTitle: formData.valuesTitle,
        name: formData.name,
        content: formData.content,
        description: formData.description,
      };

      await postValue(payload).unwrap();

      toast.success("Value added successfully!");
      reset();

      setTimeout(() => {
        navigate("/home-all-values");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the value. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  const reset = () => {
    setFormData({
      valuesTitle: "68bee3e2162679e28b2f8bf2",
      name: { ar: "", en: "", tr: "" },
      content: { ar: "", en: "", tr: "" },
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
    handlePost,
    isLoading,
  };
};
