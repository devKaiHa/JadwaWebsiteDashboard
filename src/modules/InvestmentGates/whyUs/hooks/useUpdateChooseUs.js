import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneChooseusQuery,
  useUpdateChooseusMutation,
} from "../../../../rtk/investmentGates/chooseUsApi/chooseUsApi"; // Adjust the import path
import { toast } from "react-toastify";

export const useUpdateChooseUs = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetOneChooseusQuery(id, { skip: !id });

  const [updateChooseUs, { isLoading: isUpdating, error: updateError }] =
    useUpdateChooseusMutation();

  const [formData, setFormData] = useState({
    chooseUsTitle: "68bee3e2162679e28b2f8bf2", // default title ID
    title: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Load existing data
  useEffect(() => {
    if (data?.data) {
      setFormData({
        chooseUsTitle: data.data.chooseUsTitle || "",
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
      // Title validation
      if (!formData.title[lang].trim()) {
        newErrors[`title${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Title (${lang.toUpperCase()}) is required`;
      }

      // Description validation
      const desc = formData.description[lang];
      if (!desc || desc.trim() === "") {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is required`;
      } else if (len(desc) < 1) {
        newErrors[`description${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too short: ${len(desc)}/1`;
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
        chooseUsTitle: formData.chooseUsTitle,
        title: formData.title,
        description: formData.description,
      };

      await updateChooseUs({ id, payload }).unwrap();
      toast.success("Choose Us updated successfully!");
      setTimeout(() => {
        navigate("/investment-whyus"); // Adjust the route as needed
      }, 2000);
    } catch (err) {
      const message =
        updateError?.data?.message ||
        "An error occurred while updating. Please try again.";
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
