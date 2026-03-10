import { useState, useEffect } from "react";
import {
  useUpdateServiceTMutation,
  useGetOneServiceTQuery,
} from "../../../../rtk/Turkish Citzenship/Service/serviceApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useUpdateService = (id, onClose) => {
  const navigate = useNavigate();

  const {
    data,
    error: fetchError,
    isLoading: isFetching,
    isError,
  } = useGetOneServiceTQuery(id);
  console.log(data);

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    shortDescriptopn: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [updateService, { isLoading: isUpdating, error: updateError }] =
    useUpdateServiceTMutation();

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
        if (!firstErrorMessage)
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
      }
    });

    ["en", "ar", "tr"].forEach((lang) => {
      const val = formData.shortDescriptopn[lang]?.trim() || "";
      if (!val) {
        newErrors[`shortDescriptopn${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Short Description (${lang.toUpperCase()}) is required`;
      } else if (val.length < 1) {
        newErrors[`shortDescriptopn${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Short Description (${lang.toUpperCase()}) is too short: ${val.length}/1`;
      }
    });

    setErrors(newErrors);

    if (firstErrorMessage) {
      if (firstErrorMessage.includes("required"))
        toast.error(firstErrorMessage);
      else toast.warning(firstErrorMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      await updateService({ id, formData }).unwrap();
      toast.success("Service updated successfully!");
      if (onClose) onClose(false);

      setTimeout(() => {
        navigate("/turkish-service");
      }, 2000);
    } catch (err) {
      console.error("Error updating service:", err);
      const message = err?.data?.includes("ValidationError")
        ? "All fields are required in all three languages"
        : "An error occurred while updating the service. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    serverError,
    isFetching,
    isError,
    isLoading: isUpdating,
    handleUpdate,
  };
};

export default useUpdateService;
