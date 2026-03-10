import { useState, useEffect } from "react";
import { usePostInvestMutation } from "../../../../rtk/Turkish Citzenship/investOptions/investApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAddInvest = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    shortDescriptopn: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postInvest, { isLoading, isSuccess, error }] = usePostInvestMutation();

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    ["en", "ar", "tr"].forEach((lang) => {
      if (!formData.title[lang]?.trim()) {
        newErrors[`title${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
        }
      }
    });

    ["en", "ar", "tr"].forEach((lang) => {
      const val = formData.shortDescriptopn[lang]?.trim() || "";
      if (!val) {
        newErrors[`shortDescriptopn${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Short Description (${lang.toUpperCase()}) is required`;
        }
      } else if (val.length < 1) {
        newErrors[`shortDescriptopn${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Short Description (${lang.toUpperCase()}) is too short: ${val.length}/1`;
        }
      }
    });

    setErrors(newErrors);

    if (firstErrorMessage) {
      if (firstErrorMessage.includes("required")) {
        toast.error(firstErrorMessage);
      } else {
        toast.warning(firstErrorMessage);
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleAdd = async () => {
    if (!validate()) return;

    try {
      await postInvest(formData).unwrap();
      toast.success("Investment option added successfully!");
      reset();

      setTimeout(() => {
        navigate("/turkish-invest");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error adding investment:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the investment. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  // ✅ Reset form
  const reset = () => {
    setFormData({
      title: { ar: "", en: "", tr: "" },
      shortDescriptopn: { ar: "", en: "", tr: "" },
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

export default useAddInvest;
