import { useState, useEffect } from "react";
import {
  useUpdateCountryMutation,
  useGetOneCountryQuery,
} from "../../../../rtk/Home/countries/CountriesApi";
import { toast } from "react-toastify";

export const useUpdateCountry = (id, sh, onClose) => {
  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    flag: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: countryData, isLoading: isFetching } = useGetOneCountryQuery(
    id,
    { skip: !sh || !id },
  );

  const [updateCountry, { isLoading, isSuccess, error }] =
    useUpdateCountryMutation();

  useEffect(() => {
    if (countryData) {
      setFormData({
        name: {
          ar: countryData?.data?.name?.ar || "",
          en: countryData?.data?.name?.en || "",
          tr: countryData?.data?.name?.tr || "",
        },
        flag: countryData?.data?.flag || "",
        image: null,
      });
      setPreview(countryData?.data?.img || null);
    }
  }, [countryData]);

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    // Validate names
    ["ar", "en", "tr"].forEach((lang) => {
      if (!formData.name[lang].trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
      }
    });

    // Validate image only if new image is selected
    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = true;
        if (!firstErrorMessage)
          firstErrorMessage = "Invalid image type. Only JPEG or PNG allowed.";
      }
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (formData.image.size > maxSize) {
        newErrors.image = true;
        if (!firstErrorMessage) firstErrorMessage = "Image size exceeds 2MB";
      }
    }

    setErrors(newErrors);
    if (firstErrorMessage) toast.error(firstErrorMessage);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    const form = new FormData();
    form.append("name[ar]", formData.name.ar);
    form.append("name[en]", formData.name.en);
    form.append("name[tr]", formData.name.tr);
    form.append("flag", formData.flag);

    if (formData.image) {
      form.append("img", formData.image);
    }

    try {
      await updateCountry({ id, body: form }).unwrap();
      toast.success("Country updated successfully");
    } catch (err) {
      console.error("Error updating country:", err);
      toast.error("Failed to update country. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose(false);
    }
  }, [isSuccess]);

  return {
    formData,
    setFormData,
    handleImageChange: (file) => {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    },
    preview,
    handleUpdate,
    isLoading,
    isFetching,
    error,
    errors,
  };
};
