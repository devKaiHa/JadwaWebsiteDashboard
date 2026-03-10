import { useState } from "react";
import { usePostStagesMutation } from "../../../../rtk/investmentGates/stagesApi/stagesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAddStage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: { ar: "", en: "", tr: "" },
    steps: [
      {
        title: { ar: "", en: "", tr: "" },
        description: { ar: "", en: "", tr: "" },
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [postStage, { isLoading, error }] = usePostStagesMutation();

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstMessage = "";

    const checkRequired = (field, lang, value) => {
      if (!value.trim()) {
        newErrors[`${field}${lang.toUpperCase()}`] = true;
        if (!firstMessage) {
          firstMessage = `${field} (${lang.toUpperCase()}) is required`;
        }
      }
    };

    // Validate Title
    ["en", "ar", "tr"].forEach((lang) => {
      checkRequired("title", lang, formData.title[lang]);
    });

    // Validate Steps
    formData.steps.forEach((step, idx) => {
      ["en", "ar", "tr"].forEach((lang) => {
        checkRequired(`step${idx + 1}_title`, lang, step.title[lang]);
        checkRequired(
          `step${idx + 1}_description`,
          lang,
          step.description[lang]
        );
      });
    });

    setErrors(newErrors);

    if (firstMessage) {
      toast.error(firstMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      await postStage(formData).unwrap();
      toast.success("Stage added successfully");
      reset();
      setTimeout(() => navigate("/investment-stage"), 2000);
    } catch (err) {
      console.error("Error adding stage:", err);
      toast.error("Failed to add stage");
    }
  };

  const handleStepChange = (index, field, lang, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field][lang] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          title: { ar: "", en: "", tr: "" },
          description: { ar: "", en: "", tr: "" },
        },
      ],
    });
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index);
      setFormData({ ...formData, steps: newSteps });
    }
  };

  const handleTitleChange = (lang, value) => {
    setFormData({
      ...formData,
      title: { ...formData.title, [lang]: value },
    });
  };

  const reset = () => {
    setFormData({
      title: { ar: "", en: "", tr: "" },
      steps: [
        {
          title: { ar: "", en: "", tr: "" },
          description: { ar: "", en: "", tr: "" },
        },
      ],
    });
    setErrors({});
  };

  return {
    formData,
    handleSave,
    isLoading,
    error,
    handleStepChange,
    addStep,
    removeStep,
    handleTitleChange,
    errors,
  };
};

export default useAddStage;
