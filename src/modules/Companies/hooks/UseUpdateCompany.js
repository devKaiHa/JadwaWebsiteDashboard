import { useState, useEffect } from "react";
import {
  useGetOneCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../rtk/Companies/CompaniesApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useGetAllHmeCountriesQuery } from "../../../rtk/Home/countries/CountriesApi";

const useUpdateCompany = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const {
    data,
    isLoading: isFetching,
    isError: isGetError,
  } = useGetOneCompanyQuery(id);
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const query = `limit=100`;
  const { data: countries } = useGetAllHmeCountriesQuery(query);

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
    country: { ar: "", en: "", tr: "" },
  });

  const [errors, setErrors] = useState({});

  // ------------------ FETCH AND SET DATA ------------------
  useEffect(() => {
    if (data?.data) {
      const d = data.data;
      console.log(`d`, d);

      setCompany({
        company_logo: d.company_logo || null,
        company_logo2: d.company_logo2 || null,
        company_background: d.company_background || null,
        companyName: d.companyName || { ar: "", en: "", tr: "" },
        aboutus: d.aboutus || { ar: "", en: "", tr: "" },
        about: d.about || { ar: "", en: "", tr: "" },
        mission: d.mission || { ar: "", en: "", tr: "" },
        vision: d.vision || { ar: "", en: "", tr: "" },
        serviceTitle: d.serviceTitle || { ar: "", en: "", tr: "" },
        Experience: d.Experience || "",
        ExperienceField: d.ExperienceField || { ar: "", en: "", tr: "" },
        introduction: d.introduction || {
          title: { ar: "", en: "", tr: "" },
          array: [{ ar: "", en: "", tr: "" }],
        },
        goals:
          d.goals && d.goals.length ? d.goals : [{ ar: "", en: "", tr: "" }],
        social_links: d.social_links || {
          x: "",
          instagram: "",
          facebook: "",
          linkedin: "",
        },
        stratgicTitle: d.stratgicTitle || { ar: "", en: "", tr: "" },
        stratgicSubTitle: d.stratgicSubTitle || { ar: "", en: "", tr: "" },
        country: d.country || { ar: "", en: "", tr: "" },
      });
    }
  }, [data]);

  // ------------------ VALIDATION ------------------
  const validate = () => {
    const newErrors = {};
    let firstMessage = "";
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
        if (!company[field]?.[lang]?.trim()) {
          newErrors[`${field}${lang.toUpperCase()}`] = true;
          if (!firstMessage)
            firstMessage = `${field} (${lang.toUpperCase()}) is required`;
        }
      });
    });

    if (!company.Experience) {
      newErrors.Experience = true;
      if (!firstMessage) firstMessage = "Experience is required";
    }

    company.goals.forEach((goal, idx) => {
      langs.forEach((lang) => {
        if (!goal[lang]?.trim()) {
          newErrors[`goals[${idx}][${lang}]`] = true;
          if (!firstMessage)
            firstMessage = `Goal ${idx + 1} (${lang.toUpperCase()}) is required`;
        }
      });
    });

    langs.forEach((lang) => {
      if (!company.introduction.title[lang]?.trim()) {
        newErrors[`introductionTitle${lang.toUpperCase()}`] = true;
        if (!firstMessage)
          firstMessage = `Introduction title (${lang.toUpperCase()}) is required`;
      }
    });

    company.introduction.array.forEach((item, idx) => {
      langs.forEach((lang) => {
        if (!item[lang]?.trim()) {
          newErrors[`introductionArray[${idx}][${lang}]`] = true;
          if (!firstMessage)
            firstMessage = `Introduction point ${idx + 1} (${lang.toUpperCase()}) is required`;
        }
      });
    });

    ["company_logo", "company_logo2", "company_background"].forEach((field) => {
      const file = company[field];
      if (file && typeof file !== "string") {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          newErrors[field] = true;
          if (!firstMessage)
            firstMessage = `Invalid ${field.replace(/_/g, " ")} type. Only JPEG or PNG allowed.`;
        }
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          newErrors[field] = true;
          if (!firstMessage)
            firstMessage = `${field.replace(/_/g, " ")} size exceeds 2MB`;
        }
      }
    });

    setErrors(newErrors);
    if (firstMessage) toast.error(firstMessage);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ HANDLE UPDATE ------------------
  // ------------------ HANDLE UPDATE ------------------
  const handleUpdate = async () => {
    if (!validate()) return;

    const formData = new FormData();
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

    ["company_logo", "company_logo2", "company_background"].forEach((field) => {
      if (company[field] && company[field] instanceof File) {
        formData.append(field, company[field]);
      }
    });

    multiLangFields.forEach((field) => {
      langs.forEach((lang) => {
        formData.append(`${field}[${lang}]`, company[field][lang]);
      });
    });

    formData.append("Experience", company.Experience);

    company.goals.forEach((goal, idx) => {
      langs.forEach((lang) => {
        formData.append(`goals[${idx}][${lang}]`, goal[lang]);
      });
    });

    langs.forEach((lang) => {
      formData.append(
        `introduction[title][${lang}]`,
        company.introduction.title[lang],
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
      await updateCompany({ id, data: formData }).unwrap();
      toast.success("Company updated successfully!");
      setTimeout(() => navigate("/all-companies"), 2000);
    } catch (err) {
      toast.error("Failed to update company.");
    }
  };

  const handleImageChange = (field, file) => {
    setCompany((prev) => ({ ...prev, [field]: file }));
  };

  return {
    company,
    setCompany,
    handleImageChange,
    handleUpdate,
    errors,
    isLoading,
    isFetching,
    isGetError,
    countries,
  };
};

export default useUpdateCompany;
