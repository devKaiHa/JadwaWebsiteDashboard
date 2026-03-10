import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { usePostChooseusMutation } from "../../../../rtk/investmentGates/chooseUsApi/chooseUsApi"; // Adjust import path
import { toast } from "react-toastify";

export const useAddChooseUs = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    chooseUsTitle: "68bee3e2162679e28b2f8bf2", // default title ID
    title: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postChooseUs, { isLoading, isSuccess, error }] =
    usePostChooseusMutation();

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
        chooseUsTitle: formData.chooseUsTitle,
        title: formData.title,
        description: formData.description,
      };

      await postChooseUs(payload).unwrap();

      toast.success("Choose Us entry added successfully!");
      reset();

      setTimeout(() => {
        navigate("/investment-whyus"); // Adjust route as needed
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the entry. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  const reset = () => {
    setFormData({
      chooseUsTitle: "68bee3e2162679e28b2f8bf2",
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
