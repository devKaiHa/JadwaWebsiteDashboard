import { useState, useEffect } from "react";
import {
  useUpdateInvestMutation,
  useGetOneInvestQuery,
} from "../../../../rtk/Turkish Citzenship/investOptions/investApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export const useUpdateInvest = (onClose) => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ جلب id من الرابط

  const { data, isLoading: isFetching, isError } = useGetOneInvestQuery(id);

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    shortDescriptopn: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [updateInvest, { isLoading, error }] = useUpdateInvestMutation();

  // ✅ تحميل البيانات عند فتح الصفحة
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.data.title || { ar: "", en: "", tr: "" },
        shortDescriptopn: data.data.shortDescriptopn || {
          ar: "",
          en: "",
          tr: "",
        },
      });
    }
  }, [data]);

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";

    ["en", "ar", "tr"].forEach((lang) => {
      if (!formData.title[lang]?.trim()) {
        newErrors[`title${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
        }
      }
    });

    ["en", "ar", "tr"].forEach((lang) => {
      const val = formData.shortDescriptopn[lang]?.trim() || "";
      if (!val) {
        newErrors[`shortDescriptopn${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Short Description (${lang.toUpperCase()}) is required`;
        }
      } else if (val.length < 1) {
        newErrors[`shortDescriptopn${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage) {
          firstErrorMessage = `Short Description (${lang.toUpperCase()}) is too short: ${val.length}/1`;
        }
      }
    });

    setErrors(newErrors);

    if (firstErrorMessage) {
      if (firstErrorMessage.includes("required")) {
        toast.error(firstErrorMessage);
      } else {
        toast.warning(firstErrorMessage);
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit (Update)
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      await updateInvest({ id, formData }).unwrap();
      toast.success("Investment option updated successfully!");

      setTimeout(() => {
        navigate("/turkish-invest");
      }, 2000);

      if (onClose) onClose(false);
    } catch (err) {
      console.error("Error updating investment:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while updating the investment. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    if (error) {
      const message = "Server error occurred";
      setServerError(message);
      toast.error(message);
    }
  }, [error]);

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

export default useUpdateInvest;
