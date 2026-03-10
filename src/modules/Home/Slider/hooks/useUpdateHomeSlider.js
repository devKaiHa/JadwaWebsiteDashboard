import { useState, useEffect } from "react";
import {
  useGetOneSliderQuery,
  useUpdateSliderMutation,
} from "../../../../rtk/Home/Slider/HomeSliderApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const UseUpdateHomeSlider = (id) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetOneSliderQuery(id);
  const [updateSlider] = useUpdateSliderMutation();

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    background: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Load existing slider data
  useEffect(() => {
    if (data?.data) {
      const slider = data.data;
      setFormData({
        title: slider.title,
        description: slider.description,
        background: null,
      });
      setPreview(slider.img);
    }
  }, [data]);

  // Validation
  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
    let isWarning = false;
    const len = (t = "") => t.length;

    const checkField = (field, lang, text) => {
      if (!text.trim()) {
        newErrors[`${field}${lang.toUpperCase()}`] = true;
        if (!firstMessage) {
          firstMessage = `${field} (${lang.toUpperCase()}) is required`;
          isWarning = false;
        }
      } else if (field === "description") {
        if (len(text) < 1) {
          newErrors[`${field}${lang.toUpperCase()}`] = true;
          if (!firstMessage) {
            firstMessage = `${field} (${lang.toUpperCase()}) is too short: ${len(text)}/1`;
            isWarning = true;
          }
        }
      }
    };

    ["ar", "en", "tr"].forEach((lang) =>
      checkField("title", lang, formData.title[lang])
    );
    ["ar", "en", "tr"].forEach((lang) =>
      checkField("description", lang, formData.description[lang])
    );

    // Validate new image if selected
    if (formData.background) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.background.type)) {
        newErrors.background = true;
        if (!firstMessage) {
          firstMessage = "Invalid image type. Only JPEG or PNG allowed.";
          isWarning = false;
        }
      }
      const maxSize = 2 * 1024 * 1024;
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
      const dataToSend = new FormData();
      dataToSend.append("title[ar]", formData.title.ar);
      dataToSend.append("title[en]", formData.title.en);
      dataToSend.append("title[tr]", formData.title.tr);
      dataToSend.append("description[ar]", formData.description.ar);
      dataToSend.append("description[en]", formData.description.en);
      dataToSend.append("description[tr]", formData.description.tr);

      if (formData.background) {
        dataToSend.append("img", formData.background);
      }

      await updateSlider({ id, formData: dataToSend }).unwrap();
      toast.success("Slider updated successfully");
      setTimeout(() => navigate("/home-slider-list"), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update slider");
    }
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, background: file }));
    setPreview(URL.createObjectURL(file));
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
    isError,
  };
};
