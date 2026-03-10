import { useState, useEffect } from "react";
import { usePostServiceTMutation } from "../../../../rtk/Turkish Citzenship/Service/serviceApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAddService = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    shortDescriptopn: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postService, { isLoading, isSuccess, error }] =
    usePostServiceTMutation();

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    // ✅ Title (لكل لغة)
    ["en", "ar", "tr"].forEach((lang) => {
      if (!formData.title[lang]?.trim()) {
        newErrors[`title${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
        }
      }
    });

    // ✅ Short Description (مع شرط الطول 80–100)
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
      await postService(formData).unwrap();
      toast.success("Service added successfully!");
      reset();

      setTimeout(() => {
        navigate("/turkish-service");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error adding service:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the service. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  // ✅ Reset
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

export default useAddService;
