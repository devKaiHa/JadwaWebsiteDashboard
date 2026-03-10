import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { usePostFundMutation } from "../../../rtk/funds/FundsPageApi";

const languages = ["en", "ar", "tr"];

const UseFundForm = () => {
  const navigate = useNavigate();
  const [postFund, { isLoading }] = usePostFundMutation();

  const [formData, setFormData] = useState({
    title: { en: "", ar: "", tr: "" },
    subtitle: { en: "", ar: "", tr: "" },
    overview: { en: "", ar: "", tr: "" },
    description: { en: "", ar: "", tr: "" },
    investmentVolume: "",
    sectors: [{ en: "", ar: "", tr: "" }],
    benefitsTitle: { en: "", ar: "", tr: "" },
    benefitSubtitle: { en: "", ar: "", tr: "" },
    benefits: [{ en: "", ar: "", tr: "" }],
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = null;

    // Required texts
    for (const field of ["title", "subtitle", "overview", "description"]) {
      for (const lang of languages) {
        if (!formData[field][lang]?.trim()) {
          newErrors[`${field}_${lang}`] = true;
          if (!firstErrorMessage) {
            firstErrorMessage = `${field} (${lang.toUpperCase()}) is required`;
          }
        }
      }
    }

    // Investment Volume
    if (!formData.investmentVolume?.trim()) {
      newErrors.investmentVolume = true;
      if (!firstErrorMessage) {
        firstErrorMessage = "Investment Volume is required";
      }
    }

    // Sectors
    for (let idx = 0; idx < formData.sectors.length; idx++) {
      for (const lang of languages) {
        if (!formData.sectors[idx][lang]?.trim()) {
          newErrors[`sector_${idx}_${lang}`] = true;
          if (!firstErrorMessage) {
            firstErrorMessage = `Sector ${idx + 1} (${lang.toUpperCase()}) is required`;
          }
        }
      }
    }

    // Benefits title + subtitle
    for (const lang of languages) {
      if (!formData.benefitsTitle[lang]?.trim()) {
        newErrors[`benefitsTitle_${lang}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Benefits Title (${lang.toUpperCase()}) is required`;
        }
      }
      if (!formData.benefitSubtitle[lang]?.trim()) {
        newErrors[`benefitSubtitle_${lang}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Benefit Subtitle (${lang.toUpperCase()}) is required`;
        }
      }
    }

    // Benefits list
    for (let idx = 0; idx < formData.benefits.length; idx++) {
      for (const lang of languages) {
        if (!formData.benefits[idx][lang]?.trim()) {
          newErrors[`benefit_${idx}_${lang}`] = true;
          if (!firstErrorMessage) {
            firstErrorMessage = `Benefit ${idx + 1} (${lang.toUpperCase()}) is required`;
          }
        }
      }
    }

    setErrors(newErrors);

    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
      return false;
    }

    return true;
  };

  const handlePost = async () => {
    if (!validate()) return;

    try {
      const payload = { ...formData };
      await postFund(payload).unwrap();

      toast.success("Fund added successfully!");
      setTimeout(() => {
        navigate("/all-funds");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setServerError("An error occurred while saving. Please try again.");
    }
  };

  return {
    formData,
    setFormData,
    errors,
    serverError,
    handlePost,
    isLoading,
  };
};

export default UseFundForm;
