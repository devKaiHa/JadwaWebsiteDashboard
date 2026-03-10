import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateFundMutation,
  useGetOneFundQuery,
} from "../../../rtk/funds/FundsPageApi";

const UseFundUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    subtitle: { ar: "", en: "", tr: "" },
    benefitsTitle: { ar: "", en: "", tr: "" },
    benefitSubtitle: { ar: "", en: "", tr: "" },
    overview: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    sectors: [{ ar: "", en: "", tr: "" }],
    investmentVolume: "",
    benefits: [{ ar: "", en: "", tr: "" }],
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const {
    data: fundData,
    isLoading: isFetching,
    isError,
  } = useGetOneFundQuery(id);  
  console.log(fundData);
  
  const [updateFund, { isLoading, isSuccess, error }] = useUpdateFundMutation();

  useEffect(() => {
    if (fundData?.data) {
      const fd = fundData.data;
      setFormData({
        title: fd.title || { ar: "", en: "", tr: "" },
        subtitle: fd.subtitle || { ar: "", en: "", tr: "" },
        benefitsTitle: fd.benefitsTitle || { ar: "", en: "", tr: "" },
        benefitSubtitle: fd.benefitSubtitle || { ar: "", en: "", tr: "" },
        overview: fd.overview || { ar: "", en: "", tr: "" },
        description: fd.description || { ar: "", en: "", tr: "" },
        sectors: fd.sectors.length ? fd.sectors : [{ ar: "", en: "", tr: "" }],
        investmentVolume: fd.investmentVolume || "",
        benefits: fd.benefits.length
          ? fd.benefits
          : [{ ar: "", en: "", tr: "" }],
      });
    }
  }, [fundData]);

  // Validation
  const validate = () => {
    const newErrors = {};
    [
      "title",
      "subtitle",
      "overview",
      "description",
      "benefitsTitle",
      "benefitSubtitle",
    ].forEach((field) => {
      ["en", "ar", "tr"].forEach((lang) => {
        if (!formData[field][lang]?.trim()) {
          newErrors[`${field}_${lang}`] = true;
        }
      });
    });

    formData.sectors.forEach((sector, idx) => {
      ["en", "ar", "tr"].forEach((lang) => {
        if (!sector[lang]?.trim()) newErrors[`sector_${idx}_${lang}`] = true;
      });
    });

    formData.benefits.forEach((benefit, idx) => {
      ["en", "ar", "tr"].forEach((lang) => {
        if (!benefit[lang]?.trim()) newErrors[`benefit_${idx}_${lang}`] = true;
      });
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0)
      toast.error(
        "⚠️ All translations (EN, AR, TR) must be filled before saving!"
      );

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    try {
      await updateFund({ id, formData }).unwrap();
      toast.success("Fund updated successfully!");
      setTimeout(() => navigate("/all-funds"), 1500);
    } catch (err) {
      console.error(err);
      setServerError(
        err?.data?.message || "An error occurred while updating the fund."
      );
    }
  };

  return {
    formData,
    setFormData,
    errors,
    serverError,
    handleUpdate,
    isError,
    isLoading: isFetching,
  };
};

export default UseFundUpdate;
