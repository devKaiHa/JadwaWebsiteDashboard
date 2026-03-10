import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { usePostInvestServiceMutation } from "../../../../rtk/investmentGates/investServiceApi/investServiceApi";
import { toast } from "react-toastify";

export const useAddInvestService = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    investTitle: "68bee19c745defc4dc72190e",
    title: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postInvestService, { isLoading, isSuccess, error }] =
    usePostInvestServiceMutation();

  // Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";
    const len = (t = "") => t.length;

    ["ar", "en", "tr"].forEach((lang) => {
      // Title validation
      if (!formData.title[lang].trim()) {
        newErrors[`title${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
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
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too short: ${len(desc)}/1`;
      }
    });

    setErrors(newErrors);

    if (firstErrorMessage) {
      toast[firstErrorMessage.includes("required") ? "error" : "warning"](
        firstErrorMessage
      );
    }

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handlePost = async () => {
    if (!validate()) return;

    try {
      const payload = {
        investTitle: formData.investTitle,
        title: formData.title,
        description: formData.description,
      };

      await postInvestService(payload).unwrap();

      toast.success("Invest Service added successfully!");
      reset();

      setTimeout(() => {
        navigate("/investment-service");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the invest service. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  const reset = () => {
    setFormData({
      investTitle: "68bee19c745defc4dc72190e",
      title: { ar: "", en: "", tr: "" },
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
