import { useState, useEffect } from "react";
import { usePostFundsMutation } from "../../../../rtk/Home/funds/FundsApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const UseAddFund = (onClose) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    investment: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [postHomeFunds, { isLoading, isSuccess, error }] =
    usePostFundsMutation();

  const validate = () => {
    const newErrors = {};
    const len = (t = "") => t.length;

    let firstErrorMessage = ""; // لتخزين أول خطأ يظهر
    let firstWarningMessage = ""; // لتخزين أول تحذير يظهر

    ["ar", "en", "tr"].forEach((lang) => {
      // Name validation
      if (!formData.name[lang].trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
      }

      // Description validation
      const descLen = len(formData.description[lang]);
      if (!formData.description[lang].trim()) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is required`;
      } else if (descLen < 1) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstWarningMessage)
          firstWarningMessage = `Description (${lang.toUpperCase()}) is too short: ${descLen}/1`;
      }

      // Investment validation
      if (!formData.investment[lang].trim()) {
        newErrors[`investment${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Investment (${lang.toUpperCase()}) is required`;
      }
    });

    setErrors(newErrors);

    // عرض الإشعارات بالترتيب: أول الأخطاء ثم التحذيرات
    if (firstErrorMessage) toast.error(firstErrorMessage);
    else if (firstWarningMessage) toast.warning(firstWarningMessage);

    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        investment: formData.investment,
      };

      await postHomeFunds(payload).unwrap();
      toast.success("Fund added successfully!");

      reset();
      if (onClose) onClose(false);
      setTimeout(() => {
        navigate("/home-all_funds");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while adding the fund. Please try again";
      setServerError(message);
      toast.error(message);
    }
  };

  const reset = () => {
    setFormData({
      name: { ar: "", en: "", tr: "" },
      description: { ar: "", en: "", tr: "" },
      investment: { ar: "", en: "", tr: "" },
    });
    setErrors({});
    setServerError("");
  };

  useEffect(() => {
    if (isSuccess && onClose) onClose(false);
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setServerError("Server error occurred");
      toast.error("Server error occurred");
    }
  }, [error]);

  return {
    formData,
    setFormData,
    errors,
    serverError,
    handlePost,
    isLoading,
  };
};
