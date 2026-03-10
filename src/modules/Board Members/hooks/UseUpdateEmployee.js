// UseUpdateEmployee.js
import { useState, useEffect } from "react";
import {
  useGetOneMemberQuery,
  useUpdateMemberMutation,
} from "../../../rtk/members/MembersApi";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UseUpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetOneMemberQuery(id);
  const [updateEmployee] = useUpdateMemberMutation();

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

  // --- Array Helpers ---
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

  // --- Load member data ---
  useEffect(() => {
    if (data?.data) {
      const member = data.data;
      console.log("member", member);
      setFormData({
        name: member.name || { ar: "", en: "", tr: "" },
        position: member.position || { ar: "", en: "", tr: "" },
        bio: member.bio || { ar: "", en: "", tr: "" },
        email: member.email || "",
        phone: member.phone || "",
        website: member.website || "",
        img: null,
        nationality: member.nationality || { ar: "", en: "", tr: "" },
        address: member.address || { ar: "", en: "", tr: "" },
        birthDate: member.birthDate || "",
        education: member.education?.length
          ? member.education.map((e) => ({
              ar: e.ar || "",
              en: e.en || "",
              tr: e.tr || "",
            }))
          : [{ ar: "", en: "", tr: "" }],
        professionalExperience: member.professionalExperience?.length
          ? member.professionalExperience.map((e) => ({
              ar: e.ar || "",
              en: e.en || "",
              tr: e.tr || "",
            }))
          : [{ ar: "", en: "", tr: "" }],
        isFounder: member?.isFounder === "true",
      });
      setPreview(member.img || null);
    }
  }, [data]);

  // --- Validation ---
  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
    let isWarning = false;

    const checkField = (field, minLength = 3) => {
      ["en", "ar", "tr"].forEach((lang) => {
        const value = formData[field][lang]?.trim() || "";
        if (!value) {
          newErrors[`${field}_${lang}`] = true;
          if (!firstMessage)
            firstMessage = `${field} (${lang.toUpperCase()}) is required`;
        } else if (value.length < minLength) {
          newErrors[`${field}_${lang}`] = true;
          if (!firstMessage)
            firstMessage = `${field} (${lang.toUpperCase()}) too short: ${value.length}/${minLength}`;
          isWarning = true;
        }
      });
    };

    // ALWAYS required fields
    checkField("name", 1);
    checkField("position", 1);
    checkField("bio", 1);

    // Founder-only validations
    checkField("nationality", 1);
    checkField("address", 1);

    ["education", "professionalExperience"].forEach((field) => {
      formData[field].forEach((item, idx) => {
        ["ar", "en", "tr"].forEach((lang) => {
          const value = item[lang]?.trim();
          if (!value || value.length < 2) {
            newErrors[`${field}_${lang}_${idx}`] = true;
            if (!firstMessage)
              firstMessage = `${field} (${lang.toUpperCase()}) item ${
                idx + 1
              } is too short`;
          }
        });
      });
    });

    // Email REQUIRED only for founder
    if (!formData.email) {
      newErrors.email = true;
      if (!firstMessage) firstMessage = "Email is required for founder";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      if (!firstMessage) firstMessage = "Invalid email format";
    }

    // BirthDate REQUIRED only for founder
    if (!formData.birthDate) {
      newErrors.birthDate = true;
      if (!firstMessage) firstMessage = "Birth date is required for founder";
    }

    setErrors(newErrors);
    if (firstMessage) {
      isWarning ? toast.warning(firstMessage) : toast.error(firstMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  // --- Update handler ---
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const dataToSend = new FormData();

      ["en", "ar", "tr"].forEach((lang) => {
        dataToSend.append(`name[${lang}]`, formData.name[lang]);
        dataToSend.append(`position[${lang}]`, formData.position[lang]);
        dataToSend.append(`bio[${lang}]`, formData.bio[lang]);
        dataToSend.append(`nationality[${lang}]`, formData.nationality[lang]);
        dataToSend.append(`address[${lang}]`, formData.address[lang]);
      });

      // Education & Experience as array-of-objects
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

      if (formData.email) dataToSend.append("email", formData.email);
      if (formData.phone) dataToSend.append("phone", formData.phone);
      if (formData.website) dataToSend.append("website", formData.website);
      if (formData.birthDate)
        dataToSend.append("birthDate", formData.birthDate);
      if (formData.img) dataToSend.append("img", formData.img);
      dataToSend.append("isFounder", formData.isFounder?.toString());

      await updateEmployee({ id, data: dataToSend }).unwrap();
      toast.success("Employee updated successfully");
      setTimeout(() => navigate("/all-members"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee");
    }
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, img: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return {
    formData,
    setFormData,
    handleImageChange,
    preview,
    errors,
    handleUpdate,
    isLoading,
    isError,
    refetch,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
  };
};

export default UseUpdateEmployee;
