import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneValuesQuery,
  useUpdateValuesMutation,
} from "../../../../rtk/Home/values/valuesApi.js";
import { toast } from "react-toastify";

export const useUpdateValue = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetOneValuesQuery(id, {
    skip: !id,
  });

  const [updateValue, { isLoading: isUpdating, error: updateError }] =
    useUpdateValuesMutation();

  const [formData, setFormData] = useState({
    valuesTitle: "68bee3e2162679e28b2f8bf2",
    name: { ar: "", en: "", tr: "" },
    content: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // تحميل البيانات الحالية
  useEffect(() => {
    if (data?.data) {
      setFormData({
        valuesTitle: data.data.valuesTitle || "",
        name: {
          ar: data.data.name.ar || "",
          en: data.data.name.en || "",
          tr: data.data.name.tr || "",
        },
        content: {
          ar: data.data.content.ar || "",
          en: data.data.content.en || "",
          tr: data.data.content.tr || "",
        },
        description: {
          ar: data.data.description.ar || "",
          en: data.data.description.en || "",
          tr: data.data.description.tr || "",
        },
      });
    }
  }, [data]);

  // التحقق من القيم
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = "";
    const len = (t = "") => t.length;

    ["ar", "en", "tr"].forEach((lang) => {
      // Name
      if (!formData.name[lang].trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
      }

      // Content
      if (!formData.content[lang].trim()) {
        newErrors[`content${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Content (${lang.toUpperCase()}) is required`;
      }

      // Description
      const desc = formData.description[lang];
      if (!desc || desc.trim() === "") {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is required`;
      } else if (len(desc) < 1) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too short: ${len(
            desc
          )}/1`;
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

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const payload = {
        valuesTitle: formData.valuesTitle,
        name: formData.name,
        content: formData.content,
        description: formData.description,
      };

      const result = await updateValue({ id, payload }).unwrap();

      toast.success("Value updated successfully!");
      setTimeout(() => {
        navigate("/home-all-values");
      }, 2000);
    } catch (err) {
      const message =
        updateError?.data?.message ||
        "An error occurred while updating the value. Please try again.";
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
