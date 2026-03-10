import { useState, useEffect } from "react";
import { usePostHomeCountryMutation } from "../../../../rtk/Home/countries/CountriesApi";
import { toast } from "react-toastify";

const usePostCountry = (onClose) => {
  const [Data, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    flag: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [postCountry, { isLoading, isSuccess }] = usePostHomeCountryMutation();

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    const checkName = (lang, value) => {
      if (!value.trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
      }
    };

    ["ar", "en", "tr"].forEach((lang) => checkName(lang, Data.name[lang]));

    // Image validation
    if (!Data.image) {
      newErrors.image = true;
      if (!firstErrorMessage) firstErrorMessage = "Country image is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(Data.image.type)) {
        newErrors.image = true;
        if (!firstErrorMessage)
          firstErrorMessage = "Invalid image type. Only JPEG or PNG allowed.";
      }
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (Data.image.size > maxSize) {
        newErrors.image = true;
        if (!firstErrorMessage) firstErrorMessage = "Image size exceeds 2MB";
      }
    }

    setErrors(newErrors);

    if (firstErrorMessage) toast.error(firstErrorMessage);

    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name[ar]", Data.name.ar);
    formData.append("name[en]", Data.name.en);
    formData.append("name[tr]", Data.name.tr);
    formData.append("flag", Data.flag);

    if (Data.image) {
      formData.append("img", Data.image);
    }

    try {
      await postCountry(formData).unwrap();
      toast.success("Country added successfully");
    } catch (err) {
      console.error("Error adding country:", err);
      toast.error("Failed to add country. Please try again.");
    }
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setFormData({
      name: { ar: "", en: "", tr: "" },
      flag: "",
      image: null,
    });
    setPreview(null);
    setErrors({});
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      if (onClose) onClose(false);
    }
  }, [isSuccess]);

  return {
    Data,
    setFormData,
    handleImageChange,
    preview,
    setPreview,
    handlePost,
    isLoading,
    errors,
  };
};

export default usePostCountry;
