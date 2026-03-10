import { useState, useEffect } from "react";
import { usePostCompanyMutation } from "../../../rtk/Companies/CompaniesApi";
import { useGetAllHmeCountriesQuery } from "../../../rtk/Home/countries/CountriesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const usePostCompany = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    company_logo: null,
    company_logo2: null,
    company_background: null,
    companyName: { ar: "", en: "", tr: "" },
    aboutus: { ar: "", en: "", tr: "" },
    about: { ar: "", en: "", tr: "" },
    mission: { ar: "", en: "", tr: "" },
    vision: { ar: "", en: "", tr: "" },
    serviceTitle: { ar: "", en: "", tr: "" },
    Experience: "",
    ExperienceField: { ar: "", en: "", tr: "" },
    introduction: {
      title: { ar: "", en: "", tr: "" },
      array: [{ ar: "", en: "", tr: "" }],
    },
    goals: [{ ar: "", en: "", tr: "" }],
    social_links: { x: "", instagram: "", facebook: "", linkedin: "" },
    stratgicTitle: { ar: "", en: "", tr: "" },
    stratgicSubTitle: { ar: "", en: "", tr: "" },
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [postCompany, { isLoading, isSuccess }] = usePostCompanyMutation();

  const query = `limit=100`;
  const { data: countries } = useGetAllHmeCountriesQuery(query);

  // ------------------ VALIDATION ------------------
  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
    let isWarning = false;

    const langs = ["ar", "en", "tr"];
    const multiLangFields = [
      "companyName",
      "aboutus",
      "serviceTitle",
      "ExperienceField",
      "about",
      "mission",
      "vision",
      "stratgicTitle",
      "stratgicSubTitle",
    ];

    multiLangFields.forEach((field) => {
      langs.forEach((lang) => {
        const value = company[field]?.[lang] || "";
        if (!value.trim()) {
          newErrors[`${field}${lang.toUpperCase()}`] = true;
          if (!firstMessage) {
            firstMessage = `${field} (${lang.toUpperCase()}) is required`;
            isWarning = false;
          }
        }
      });
    });

    if (!company.Experience) {
      newErrors.Experience = true;
      if (!firstMessage) {
        firstMessage = "Experience is required";
        isWarning = false;
      }
    }

    company.goals.forEach((goal, index) => {
      langs.forEach((lang) => {
        if (!goal[lang]?.trim()) {
          newErrors[`goals[${index}][${lang}]`] = true;
          if (!firstMessage) {
            firstMessage = `Goal ${index + 1} (${lang.toUpperCase()}) is required`;
            isWarning = false;
          }
        }
      });
    });

    langs.forEach((lang) => {
      const title = company.introduction.title[lang];
      if (!title?.trim()) {
        newErrors[`introductionTitle${lang.toUpperCase()}`] = true;
        if (!firstMessage) {
          firstMessage = `Introduction title (${lang.toUpperCase()}) is required`;
          isWarning = false;
        }
      }
    });

    company.introduction.array.forEach((item, idx) => {
      langs.forEach((lang) => {
        if (!item[lang]?.trim()) {
          newErrors[`introductionArray[${idx}][${lang}]`] = true;
          if (!firstMessage) {
            firstMessage = `Introduction point ${idx + 1} (${lang.toUpperCase()}) is required`;
            isWarning = false;
          }
        }
      });
    });

    ["company_logo", "company_logo2", "company_background"].forEach((field) => {
      const file = company[field];
      if (!file) {
        newErrors[field] = true;
        if (!firstMessage) {
          firstMessage = `${field.replace(/_/g, " ")} is required`;
          isWarning = false;
        }
      } else {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          newErrors[field] = true;
          if (!firstMessage) {
            firstMessage = `Invalid ${field.replace(/_/g, " ")} type. Only JPEG or PNG allowed.`;
            isWarning = false;
          }
        }
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          newErrors[field] = true;
          if (!firstMessage) {
            firstMessage = `${field.replace(/_/g, " ")} size exceeds 2MB`;
            isWarning = false;
          }
        }
      }
    });

    setErrors(newErrors);
    if (firstMessage) {
      if (isWarning) toast.warning(firstMessage);
      else toast.error(firstMessage);
    }

    return Object.keys(newErrors).length === 0;
  };

  // ------------------ HANDLE POST ------------------
  const handlePost = async () => {
    if (!validate()) return;

    const formData = new FormData();

    ["company_logo", "company_logo2", "company_background"].forEach((field) => {
      if (company[field]) formData.append(field, company[field]);
    });

    const multiLangFields = [
      "companyName",
      "aboutus",
      "serviceTitle",
      "ExperienceField",
      "about",
      "mission",
      "vision",
      "stratgicTitle",
      "stratgicSubTitle",
    ];
    const langs = ["ar", "en", "tr"];
    multiLangFields.forEach((field) => {
      langs.forEach((lang) => {
        formData.append(`${field}[${lang}]`, company[field][lang]);
      });
    });

    formData.append("Experience", company.Experience);
    formData.append("country", company.country.toLowerCase());

    company.goals.forEach((goal, idx) => {
      langs.forEach((lang) => {
        formData.append(`goals[${idx}][${lang}]`, goal[lang]);
      });
    });

    langs.forEach((lang) => {
      formData.append(
        `introduction[title][${lang}]`,
        company.introduction.title[lang]
      );
    });
    company.introduction.array.forEach((item, idx) => {
      langs.forEach((lang) => {
        formData.append(`introduction[array][${idx}][${lang}]`, item[lang]);
      });
    });

    Object.keys(company.social_links).forEach((key) => {
      formData.append(`social_links[${key}]`, company.social_links[key]);
    });

    try {
      const res = await postCompany(formData).unwrap();
      toast.success("Company added successfully!");
      reset();
      setTimeout(() => navigate("/all-companies"), 2000);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to add company.");
    }
  };

  const handleImageChange = (field, file) => {
    setCompany((prev) => ({ ...prev, [field]: file }));
  };

  const reset = () => {
    setCompany({
      company_logo: null,
      company_logo2: null,
      company_background: null,
      companyName: { ar: "", en: "", tr: "" },
      aboutus: { ar: "", en: "", tr: "" },
      about: { ar: "", en: "", tr: "" },
      mission: { ar: "", en: "", tr: "" },
      vision: { ar: "", en: "", tr: "" },
      serviceTitle: { ar: "", en: "", tr: "" },
      Experience: "",
      ExperienceField: { ar: "", en: "", tr: "" },
      introduction: {
        title: { ar: "", en: "", tr: "" },
        array: [{ ar: "", en: "", tr: "" }],
      },
      goals: [{ ar: "", en: "", tr: "" }],
      social_links: { x: "", instagram: "", facebook: "", linkedin: "" },
      stratgicTitle: { ar: "", en: "", tr: "" },
      stratgicSubTitle: { ar: "", en: "", tr: "" },
      country: "",
    });
    setErrors({});
  };

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess]);

  const handleChange = (field, lang, value) => {
    setCompany((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleNestedChange = (parentField, childField, lang, value) => {
    setCompany((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: {
          ...prev[parentField][childField],
          [lang]: value,
        },
      },
    }));
  };

  const handleArrayChange = (field, index, lang, value) => {
    const newArray = [...company[field]];
    newArray[index][lang] = value;
    setCompany((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const handleAddArrayItem = (field) => {
    setCompany((prev) => ({
      ...prev,
      [field]: [...prev[field], { ar: "", en: "", tr: "" }],
    }));
  };

  const handleDeleteArrayItem = (field, index) => {
    setCompany((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  return {
    company,
    setCompany,
    handleImageChange,
    errors,
    handlePost,
    isLoading,
    handleChange,
    handleNestedChange,
    handleArrayChange,
    handleAddArrayItem,
    handleDeleteArrayItem,
    countries,
  };
};

export default usePostCompany;
