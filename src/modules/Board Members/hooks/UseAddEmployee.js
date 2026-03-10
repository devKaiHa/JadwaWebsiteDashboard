// UsePostEmployee.js
import { useState } from "react";
import { usePostMemberMutation } from "../../../rtk/members/MembersApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UsePostEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    position: { ar: "", en: "", tr: "" },
    bio: { ar: "", en: "", tr: "" },
    nationality: { ar: "", en: "", tr: "" },
    address: { ar: "", en: "", tr: "" },
    education: [{ ar: "", en: "", tr: "" }],
    professionalExperience: [{ ar: "", en: "", tr: "" }],
    email: "",
    phone: "",
    website: "",
    birthDate: "",
    img: null,
    isFounder: false,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [postEmployee, { isLoading }] = usePostMemberMutation();

  const validate = () => {
    const newErrors = {};
    let firstMessage = "";

    const checkField = (field, minLength = 3) => {
      ["en", "ar", "tr"].forEach((lang) => {
        const value = formData[field][lang];
        if (!value || value.trim().length < minLength) {
          newErrors[`${field}_${lang}`] = true;
          if (!firstMessage)
            firstMessage = `${field} (${lang.toUpperCase()}) is too short`;
        }
      });
    };

    checkField("name", 1);
    checkField("position", 1);
    checkField("bio", 1);

    // Founder-only fields
    checkField("nationality", 1);
    checkField("address", 1);

    ["education", "professionalExperience"].forEach((field) => {
      formData[field].forEach((item, idx) => {
        ["ar", "en", "tr"].forEach((lang) => {
          if (!item[lang] || item[lang].trim().length < 2) {
            newErrors[`${field}_${lang}_${idx}`] = true;
            if (!firstMessage)
              firstMessage = `${field} (${lang.toUpperCase()}) item ${
                idx + 1
              } is too short`;
          }
        });
      });
    });

    if (!formData.email) newErrors.email = true;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;

    if (!formData.birthDate) newErrors.birthDate = true;

    if (!formData.img) newErrors.img = true;

    setErrors(newErrors);
    if (firstMessage) toast.error(firstMessage);

    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async () => {
    if (!validate()) return;

    try {
      const dataToSend = new FormData();

      ["ar", "en", "tr"].forEach((lang) => {
        dataToSend.append(`name[${lang}]`, formData.name[lang]);
        dataToSend.append(`position[${lang}]`, formData.position[lang]);
        dataToSend.append(`bio[${lang}]`, formData.bio[lang]);
        dataToSend.append(`nationality[${lang}]`, formData.nationality[lang]);
        dataToSend.append(`address[${lang}]`, formData.address[lang]);
      });

      // Send education and professionalExperience as array of objects
      formData.education.forEach((edu, idx) => {
        ["ar", "en", "tr"].forEach((lang) => {
          dataToSend.append(`education[${idx}][${lang}]`, edu[lang]);
        });
      });
      formData.professionalExperience.forEach((exp, idx) => {
        ["ar", "en", "tr"].forEach((lang) => {
          dataToSend.append(
            `professionalExperience[${idx}][${lang}]`,
            exp[lang],
          );
        });
      });

      dataToSend.append("email", formData.email);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("website", formData.website);
      dataToSend.append("birthDate", formData.birthDate);
      dataToSend.append("isFounder", formData.isFounder?.toString());

      if (formData.img) dataToSend.append("img", formData.img);

      await postEmployee(dataToSend).unwrap();
      toast.success("Employee added successfully");
      reset();
      setTimeout(() => navigate("/all-members"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add Employee");
    }
  };

  const handleArrayChange = (field, idx, lang, value) => {
    const arr = [...formData[field]];
    arr[idx][lang] = value;
    setFormData((prev) => ({ ...prev, [field]: arr }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], { ar: "", en: "", tr: "" }],
    }));
  };

  const removeArrayItem = (field, idx) => {
    const arr = [...formData[field]];
    arr.splice(idx, 1);
    setFormData((prev) => ({ ...prev, [field]: arr }));
  };

  const handleImageChange = (file) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, img: null }));
      setPreview(null);
      return;
    }
    setFormData((prev) => ({ ...prev, img: file }));
    setPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setFormData({
      name: { ar: "", en: "", tr: "" },
      position: { ar: "", en: "", tr: "" },
      bio: { ar: "", en: "", tr: "" },
      nationality: { ar: "", en: "", tr: "" },
      address: { ar: "", en: "", tr: "" },
      education: [{ ar: "", en: "", tr: "" }],
      professionalExperience: [{ ar: "", en: "", tr: "" }],
      email: "",
      phone: "",
      website: "",
      birthDate: "",
      img: null,
      isFounder: false,
    });
    setPreview(null);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handlePost,
    isLoading,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
  };
};

export default UsePostEmployee;
