import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOneFundsQuery,
  useUpdateFundsMutation,
} from "../../../../rtk/Home/funds/FundsApi";

export const UseUpdateFund = (id) => {
  const navigate = useNavigate();

  const {
    data,
    isLoading: isFetching,
    isError,
    refetch,
  } = useGetOneFundsQuery(id);
  const [updateFund, { isLoading: isUpdating }] = useUpdateFundsMutation();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    investment: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        name: data?.data.name || { ar: "", en: "", tr: "" },
        description: data?.data.description || { ar: "", en: "", tr: "" },
        investment: data?.data.investment || { ar: "", en: "", tr: "" },
      });
    }
  }, [data]);

  const validate = () => {
    const newErrors = {};
    const len = (text = "") => text.length;

    let firstErrorMessage = "";
    let firstWarningMessage = "";

    ["ar", "en", "tr"].forEach((lang) => {
      // Name validation
      if (!formData.name[lang].trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
      }

      // Investment validation
      if (!formData.investment[lang].trim()) {
        newErrors[`investment${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Investment (${lang.toUpperCase()}) is required`;
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
    });

    setErrors(newErrors);

    if (firstErrorMessage) toast.error(firstErrorMessage);
    else if (firstWarningMessage) toast.warning(firstWarningMessage);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        investment: formData.investment,
      };
      await updateFund({ id, payload }).unwrap();
      toast.success("Fund updated successfully!");
      setTimeout(() => navigate("/home-all_funds"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(
        "An error occurred while updating the fund. Please try again."
      );
    }
  };

  return {
    formData,
    setFormData,
    errors,
    handleUpdate,
    isUpdating,
    isFetching,
    isError,
    refetch,
  };
};
