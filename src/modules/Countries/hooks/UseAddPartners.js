import { useState, useEffect } from "react";
import { usePostPartnerMutation } from "../../../rtk/Partners/PartnersApi";

const usePostPartner = (onClose) => {
  const [Data, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [postPartner, { isLoading, isSuccess }] = usePostPartnerMutation();

  const validate = () => {
    const newErrors = {};
    if (!Data.name.trim()) newErrors.name = true;
    if (!Data.phone.trim()) newErrors.phone = true;
    if (!Data.email.trim()) newErrors.email = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", Data.name);
    formData.append("phone", Data.phone);
    formData.append("email", Data.email);
    if (Data.image) {
      formData.append("photo", Data.image);
    }

    try {
      const res = await postPartner(formData).unwrap();
      console.log( res);
    } catch (err) {
      console.error("Error adding partner:", err);
    }
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      image: null,
    });
    setPreview(null);
    setErrors({});
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose(false);
    }
  }, [isSuccess]);

  return {
    Data,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handlePost,
    isLoading,
  };
};

export default usePostPartner;
