import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneHomeSectorQuery,
  useUpdateHomeSectorMutation,
} from "../../../../rtk/Home/sectors/HomeSectorsApi";
import { toast } from "react-toastify";

export const useUpdateSector = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetOneHomeSectorQuery(id, {
    skip: !id,
  });

  const [updateSector, { isLoading: isUpdating, error: updateError }] =
    useUpdateHomeSectorMutation();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Load existing sector data
  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: {
          ar: data.data.name.ar || "",
          en: data.data.name.en || "",
          tr: data.data.name.tr || "",
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
      // Name validation
      if (!formData.name[lang].trim()) {
        newErrors[`name${lang.toUpperCase()}`] = true;
        if (!firstErrorMessage)
          firstErrorMessage = `Name (${lang.toUpperCase()}) is required`;
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
          firstErrorMessage = `Description (${lang.toUpperCase()}) is too short: ${len(
            desc
          )}/1`;
      }
    });

    setErrors(newErrors);

    // Show toast
    if (firstErrorMessage) {
      if (firstErrorMessage.includes("required")) {
        toast.error(firstErrorMessage);
      } else {
        toast.warning(firstErrorMessage);
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Update sector
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
      };

      await updateSector({ id, payload }).unwrap();
      toast.success("Sector updated successfully!");
      setTimeout(() => {
        navigate("/home-all_sectors");
      }, 2000);
    } catch (err) {
      console.error(err);
      const message =
        updateError?.data?.message ||
        "An error occurred while updating the sector. Please try again.";
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
