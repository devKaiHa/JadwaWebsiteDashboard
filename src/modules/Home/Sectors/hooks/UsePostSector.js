import { useState, useEffect } from "react";
import { usePostHomeSectorsMutation } from "../../../../rtk/Home/sectors/HomeSectorsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const UseSectors = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postHomeSector, { isLoading, isSuccess, error }] =
    usePostHomeSectorsMutation();

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

    // Use toast.error for empty, toast.warning for length issues
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
        name: formData.name,
        description: formData.description,
      };

      await postHomeSector(payload).unwrap();

      toast.success("Sector added successfully!");
      reset();

      setTimeout(() => {
        navigate("/home-all_sectors");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the sector. Please try again.";
      setServerError(message);
      toast.error(message);
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
