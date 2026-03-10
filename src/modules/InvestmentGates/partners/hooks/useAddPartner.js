import { useState } from "react";
import { usePostInvestPartnerMutation } from "../../../../rtk/investmentGates/partnersApi/partnersApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const usePostPartner = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    logo: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [postPartner, { isLoading }] = usePostInvestPartnerMutation();

  // Validation
  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
    let isWarning = false;

    const checkLength = (field, lang, text) => {
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

    // Names
    ["ar", "en", "tr"].forEach((lang) =>
      checkLength("name", lang, formData.name[lang])
    );
    // Descriptions
    ["ar", "en", "tr"].forEach((lang) =>
      checkLength("description", lang, formData.description[lang])
    );

    // Logo
    if (!formData.logo) {
      newErrors.logo = true;
      if (!firstMessage) {
        firstMessage = "Logo image is required";
        isWarning = false;
      }
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.logo.type)) {
        newErrors.logo = true;
        if (!firstMessage) {
          firstMessage = "Invalid image type. Only JPEG or PNG allowed.";
          isWarning = false;
        }
      }
      const maxSize = 2 * 1024 * 1024;
      if (formData.logo.size > maxSize) {
        newErrors.logo = true;
        if (!firstMessage) {
          firstMessage = "Image size exceeds 2MB";
          isWarning = false;
        }
      }
    }

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
      const data = new FormData();
      data.append("name[ar]", formData.name.ar);
      data.append("name[en]", formData.name.en);
      data.append("name[tr]", formData.name.tr);
      data.append("description[ar]", formData.description.ar);
      data.append("description[en]", formData.description.en);
      data.append("description[tr]", formData.description.tr);

      if (formData.logo) data.append("logo", formData.logo);

      const res = await postPartner(data).unwrap();
      console.log(res);

      toast.success("Partner added successfully!");

      setTimeout(() => navigate("/investment-partner"), 2000);
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add partner.");
    }
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, logo: file }));
    setPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setFormData({
      name: { ar: "", en: "", tr: "" },
      description: { ar: "", en: "", tr: "" },
      logo: null,
    });
    setPreview(null);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    handleImageChange,
    preview,
    setPreview,
    errors,
    handlePost,
    isLoading,
  };
};
