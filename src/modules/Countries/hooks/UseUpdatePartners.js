import { useState, useEffect } from "react";
import {
  useUpdatePartnerMutation,
  useGetOnePartnerQuery,
} from "../../../rtk/Partners/PartnersApi";

export const useUpdatePartner = (id, sh, onClose) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: partnerData, isLoading: isFetching } = useGetOnePartnerQuery(
    id,
    { skip: !sh }
  );
  const [updatePartner, { isLoading, isSuccess, error }] =
    useUpdatePartnerMutation();

  useEffect(() => {
    if (partnerData?.data) {
      const partner = partnerData.data;
      setFormData({
        name: partner.name || "",
        email: partner.email || "",
        phone: partner.phone || "",
        image: null,
      });

      setPreview(partner.image || null);
    }
  }, [partnerData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    if (formData.image) {
      form.append("photo", formData.image);
    }

    try {
      const res = await updatePartner({ id, formData: form }).unwrap();
      console.log(res);
    } catch (err) {
      console.error(err);
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
    handleImageChange,
    preview,
    errors,
    handleUpdate,
    isLoading,
    isFetching,
    error,
  };
};
