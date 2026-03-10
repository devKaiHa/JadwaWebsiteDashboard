import { useState } from "react";
import { usePostHomeSliderMutation } from "../../../../rtk/Home/Slider/HomeSliderApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const UsePostHomeSlider = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    background: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [postHomeSlider, { isLoading }] = usePostHomeSliderMutation();

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

    // Titles
    ["en", "ar", "tr"].forEach((lang) =>
      checkLength("title", lang, formData.title[lang])
    );
    // Descriptions
    ["en", "ar", "tr"].forEach((lang) =>
      checkLength("description", lang, formData.description[lang])
    );

    // Image
    if (!formData.background) {
      newErrors.background = true;
      if (!firstMessage) {
        firstMessage = "Background image is required";
        isWarning = false;
      }
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.background.type)) {
        newErrors.background = true;
        if (!firstMessage) {
          firstMessage = "Invalid image type. Only JPEG or PNG allowed.";
          isWarning = false;
        }
      }
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (formData.background.size > maxSize) {
        newErrors.background = true;
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
      data.append("title[ar]", formData.title.ar);
      data.append("title[en]", formData.title.en);
      data.append("title[tr]", formData.title.tr);
      data.append("description[ar]", formData.description.ar);
      data.append("description[en]", formData.description.en);
      data.append("description[tr]", formData.description.tr);

      if (formData.background) data.append("img", formData.background);

      await postHomeSlider(data).unwrap();
      toast.success("Slider added successfully!");

      setTimeout(() => navigate("/home-slider-list"), 2000);
      reset();
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to add slider.");
    }
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, background: file }));
    setPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setFormData({
      title: { ar: "", en: "", tr: "" },
      description: { ar: "", en: "", tr: "" },
      background: null,
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
