import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneInvestServiceQuery,
  useUpdateInvestServiceMutation,
} from "../../../../rtk/investmentGates/investServiceApi/investServiceApi";
import { toast } from "react-toastify";

export const useUpdateInvestService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetOneInvestServiceQuery(id, {
    skip: !id,
  });

  const [updateService, { isLoading: isUpdating, error: updateError }] =
    useUpdateInvestServiceMutation();

  const [formData, setFormData] = useState({
    investTitle: "68bee19c745defc4dc72190e",
    title: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Load existing data
  useEffect(() => {
    if (data?.data) {
      setFormData({
        investTitle: data.data.investTitle || "",
        title: {
          ar: data.data.title.ar || "",
          en: data.data.title.en || "",
          tr: data.data.title.tr || "",
        },
        description: {
          ar: data.data.description.ar || "",
          en: data.data.description.en || "",
          tr: data.data.description.tr || "",
        },
      });
    }
  }, [data]);

  // Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";
    const len = (t = "") => t.length;

    ["ar", "en", "tr"].forEach((lang) => {
      if (!formData.title[lang].trim()) {
        newErrors[`title${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
      }

      const desc = formData.description[lang];
      if (!desc || desc.trim() === "") {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is required`;
      } else if (len(desc) < 80) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too short: ${len(desc)}/80`;
      } else if (len(desc) > 500) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too long: ${len(desc)}/500`;
      }
    });

    setErrors(newErrors);

    if (firstErrorMessage) {
      toast[firstErrorMessage.includes("required") ? "error" : "warning"](
        firstErrorMessage
      );
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const payload = {
        investTitle: formData.investTitle,
        title: formData.title,
        description: formData.description,
      };

      await updateService({ id, payload }).unwrap();
      toast.success("Invest Service updated successfully!");
      setTimeout(() => {
        navigate("/investment-service");
      }, 2000);
    } catch (err) {
      const message =
        updateError?.data?.message ||
        "An error occurred while updating the invest service. Please try again.";
      setServerError(message);
      toast.error(message);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    serverError,
    handleUpdate,
    isFetching,
    isError,
    isUpdating,
  };
};
