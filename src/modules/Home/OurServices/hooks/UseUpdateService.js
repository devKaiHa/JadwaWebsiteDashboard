import { useState, useEffect } from "react";
import {
  useGetOneServiceQuery,
  useUpdateServiceMutation,
} from "../../../../rtk/Service/ServiceApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export const UseUpdateService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // API Queries
  const {
    data: serviceData,
    isLoading: isFetching,
    isError: fetchError,
  } = useGetOneServiceQuery(id, { skip: !id });

  const [updateService, { isLoading: isUpdating, error: updateError }] =
    useUpdateServiceMutation();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (serviceData) {
      setFormData({
        name: serviceData.data?.name || { ar: "", en: "", tr: "" },
        description: serviceData.data?.description || {
          ar: "",
          en: "",
          tr: "",
        },
      });
    }
  }, [serviceData]);

  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
    let isWarning = false;

    const checkField = (field, lang, text) => {
      if (!text.trim()) {
        newErrors[`${field}${lang.toUpperCase()}`] = true;
        if (!firstMessage) {
          firstMessage = `${field} (${lang.toUpperCase()}) is required`;
          isWarning = false;
        }
      } else if (field === "description") {
        if (text.length < 1) {
          newErrors[`${field}${lang.toUpperCase()}`] = true;
          if (!firstMessage) {
            firstMessage = `${field} (${lang.toUpperCase()}) is too short: ${text.length}/1`;
            isWarning = true;
          }
        }
      }
    };

    ["en", "ar", "tr"].forEach((lang) => {
      checkField("name", lang, formData.name[lang]);
      checkField("description", lang, formData.description[lang]);
    });

    setErrors(newErrors);

    if (firstMessage) {
      if (isWarning) toast.warning(firstMessage);
      else toast.error(firstMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      await updateService({ id, formData }).unwrap();
      toast.success("Service updated successfully!");
      setTimeout(() => {
        navigate("/all-services");
      }, 2000);
    } catch (err) {
      console.error("Update error:", err);
      const message =
        updateError?.data?.message ||
        "Failed to update service. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to load service data");
    }
  }, [fetchError]);

  return {
    formData,
    setFormData,
    errors,
    handleUpdate,
    isFetching,
    fetchError,
    isUpdating,
    serverError,
  };
};
