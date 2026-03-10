import { useState, useEffect } from "react";
import {
  useGetOneInvestPartnerQuery,
  useUpdateInvestPartnerMutation,
} from "../../../../rtk/investmentGates/partnersApi/partnersApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useUpdatePartner = (id) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetOneInvestPartnerQuery(id);
  const [updatePartner] = useUpdateInvestPartnerMutation();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    logo: null,
    steps: [
      {
        title: { ar: "", en: "", tr: "" },
        description: { ar: "", en: "", tr: "" },
      },
    ],
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data?.data) {
      const partner = data.data;
      setFormData({
        name: partner.name,
        description: partner.description,
        logo: null,
        steps: partner.steps?.length
          ? partner.steps
          : [
              {
                title: { ar: "", en: "", tr: "" },
                description: { ar: "", en: "", tr: "" },
              },
            ],
      });
      setPreview(partner.logo);
    }
  }, [data]);

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
            firstMessage = `${field} (${lang.toUpperCase()}) is too short: ${len(
              text
            )}/1`;
            isWarning = true;
          }
        }
      }
    };

    ["ar", "en", "tr"].forEach((lang) =>
      checkField("name", lang, formData.name[lang])
    );
    ["ar", "en", "tr"].forEach((lang) =>
      checkField("description", lang, formData.description[lang])
    );

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
      dataToSend.append("name[ar]", formData.name.ar);
      dataToSend.append("name[en]", formData.name.en);
      dataToSend.append("name[tr]", formData.name.tr);
      dataToSend.append("description[ar]", formData.description.ar);
      dataToSend.append("description[en]", formData.description.en);
      dataToSend.append("description[tr]", formData.description.tr);

      if (formData.logo) {
        dataToSend.append("logo", formData.logo);
      }

      // إضافة الخطوات
      dataToSend.append("steps", JSON.stringify(formData.steps));

      await updatePartner({ id, formData: dataToSend }).unwrap();
      toast.success("Partner updated successfully");
      setTimeout(() => navigate("/investment-partner"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update partner");
    }
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, logo: file }));
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
