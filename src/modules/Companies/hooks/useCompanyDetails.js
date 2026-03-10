import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useGetOneCompanyQuery } from "../../../rtk/Companies/CompaniesApi";
import {
  usePostCompanyDetailMutation,
  useUpdateCompanyDetailMutation,
  useDeleteCompanyDetailMutation,
} from "../../../rtk/Companies/CompaniesDetailApi";
import { toast } from "react-toastify";

export const useCompanyDetails = () => {
  const { id } = useParams();
  const {
    data,
    isLoading: isFetching,
    isError: isGetError,
    refetch,
  } = useGetOneCompanyQuery(id);

  const [companies, setCompanies] = useState([]);
  const [originalCompanies, setOriginalCompanies] = useState([]);
  const [addDetail] = usePostCompanyDetailMutation();
  const [updateDetail] = useUpdateCompanyDetailMutation();
  const [deleteDetail] = useDeleteCompanyDetailMutation();

  useEffect(() => {
    let mapped = [];

    if (data?.data?.details) {
      const groupedByName = {};

      data.data.details.forEach((detail) => {
        const nameKey = JSON.stringify(detail.name);

        if (!groupedByName[nameKey]) {
          groupedByName[nameKey] = {
            nameId: detail._id,
            name: { ...detail.name },
            slides: [],
          };
        }

        if (detail.slides && detail.slides.length > 0) {
          detail.slides.forEach((slide) => {
            groupedByName[nameKey].slides.push({
              _id: slide._id,
              title: { ...slide.title },
              category: { ...slide.category },
              preview: slide.img || null,
              previewFile: null,
            });
          });
        } else {
          groupedByName[nameKey].slides.push({
            _id: detail._id,
            title: { ...detail.title },
            category: { ...detail.category },
            preview: detail.img || null,
            previewFile: null,
          });
        }
      });

      mapped = Object.values(groupedByName);
    }

    // إذا كانت المصفوفة فارغة أضف عنصر واحد افتراضي
    if (mapped.length === 0) {
      mapped.push({
        name: { en: "", ar: "", tr: "" },
        slides: [
          {
            _id: `new-${Date.now()}`,
            title: { en: "", ar: "", tr: "" },
            category: { en: "", ar: "", tr: "" },
            preview: null,
            previewFile: null,
          },
        ],
      });
    }

    setCompanies(mapped);
    setOriginalCompanies(JSON.parse(JSON.stringify(mapped)));
  }, [data]);

  // باقي التوابع كما هي مع toast واحد لكل عملية
  const handleNameChange = (companyIndex, lang, value) => {
    setCompanies((prev) => {
      const updated = [...prev];
      updated[companyIndex] = {
        ...updated[companyIndex],
        name: { ...updated[companyIndex].name, [lang]: value },
      };
      return updated;
    });
  };

  const handleSlideChange = (companyIndex, slideIndex, field, lang, value) => {
    setCompanies((prev) => {
      const updated = [...prev];
      const slide = { ...updated[companyIndex].slides[slideIndex] };
      slide[field] = { ...slide[field], [lang]: value };
      updated[companyIndex].slides[slideIndex] = slide;
      return updated;
    });
  };

  const handleFileSelect = (file, companyIndex, slideIndex) => {
    setCompanies((prev) => {
      const updated = [...prev];
      const slide = { ...updated[companyIndex].slides[slideIndex] };
      slide.previewFile = file;
      slide.preview = URL.createObjectURL(file);
      updated[companyIndex].slides[slideIndex] = slide;
      return updated;
    });
  };

  const removeImage = (companyIndex, slideIndex) => {
    setCompanies((prev) => {
      const updated = [...prev];
      const slide = { ...updated[companyIndex].slides[slideIndex] };
      slide.preview = null;
      slide.previewFile = null;
      updated[companyIndex].slides[slideIndex] = slide;
      return updated;
    });
  };

  const removeSlideById = async (companyIndex, slideIndex) => {
    const slide = companies[companyIndex].slides[slideIndex];
    const existsInOriginal = originalCompanies.some((c) =>
      c.slides.some((s) => s._id === slide._id)
    );

    if (existsInOriginal) {
      try {
        await deleteDetail(slide._id).unwrap();
      } catch (error) {
        toast.error("Failed to delete the slide!");
        return;
      }
    }

    setCompanies((prev) => {
      const updated = [...prev];
      updated[companyIndex].slides = updated[companyIndex].slides.filter(
        (_, idx) => idx !== slideIndex
      );
      return updated;
    });

    toast.success("Operation completed successfully!");
  };

  const removeCompanyByIndex = async (companyIndex) => {
    const company = companies[companyIndex];

    for (let slide of company.slides) {
      const existsInOriginal = originalCompanies.some((c) =>
        c.slides.some((s) => s._id === slide._id)
      );
      if (existsInOriginal) {
        try {
          await deleteDetail(slide._id).unwrap();
        } catch (error) {
          toast.error("Failed to delete a slide!");
        }
      }
    }

    setCompanies((prev) => prev.filter((_, idx) => idx !== companyIndex));
    toast.success("Operation completed successfully!");
  };

  const addSlide = (companyIndex) => {
    const newSlide = {
      _id: `new-${Date.now()}`,
      title: { en: "", ar: "", tr: "" },
      category: { en: "", ar: "", tr: "" },
      preview: null,
      previewFile: null,
    };
    setCompanies((prev) => {
      const updated = [...prev];
      updated[companyIndex] = {
        ...updated[companyIndex],
        slides: [...updated[companyIndex].slides, newSlide],
      };
      return updated;
    });
  };

  const addCompany = () => {
    const newCompany = {
      name: { en: "", ar: "", tr: "" },
      slides: [
        {
          _id: `new-${Date.now()}`,
          title: { en: "", ar: "", tr: "" },
          category: { en: "", ar: "", tr: "" },
          preview: null,
          previewFile: null,
        },
      ],
    };
    setCompanies((prev) => [...prev, newCompany]);
  };

  const saveCompanyDetail = async (companyIndex = null) => {
    try {
      const companiesToSave =
        companyIndex !== null ? [companies[companyIndex]] : companies;

      for (let i = 0; i < companiesToSave.length; i++) {
        const company = companiesToSave[i];

        for (let j = 0; j < company.slides.length; j++) {
          const slide = company.slides[j];
          const formData = new FormData();
          formData.append("companies", id);

          Object.keys(company.name).forEach((lang) => {
            formData.append(`name[${lang}]`, company.name[lang] || "");
          });

          Object.keys(slide.title).forEach((lang) => {
            formData.append(`title[${lang}]`, slide.title[lang] || "");
          });

          Object.keys(slide.category).forEach((lang) => {
            formData.append(`category[${lang}]`, slide.category[lang] || "");
          });

          if (slide.previewFile) {
            formData.append("img", slide.previewFile);
          }

          const exists = company.nameId
            ? originalCompanies.some(
                (originalCompany) =>
                  originalCompany.nameId === company.nameId &&
                  originalCompany.slides.some((s) => s._id === slide._id)
              )
            : false;

          if (exists) {
            await updateDetail({ id: slide._id, data: formData }).unwrap();
          } else {
            const res = await addDetail(formData).unwrap();
            setCompanies((prev) => {
              const updated = [...prev];
              const actualIndex =
                companyIndex !== null
                  ? companyIndex
                  : companies.findIndex(
                      (c) =>
                        JSON.stringify(c.name) === JSON.stringify(company.name)
                    );
              if (actualIndex !== -1) {
                updated[actualIndex].slides[j]._id = res.data._id;
              }
              return updated;
            });
          }
        }
      }

      toast.success("Operation completed successfully!");
      await refetch();
    } catch (error) {
      console.error("Failed to save details:", error);
      toast.error("Failed to save details!");
    }
  };

  const saveSingleCompanyDetail = (companyIndex) =>
    saveCompanyDetail(companyIndex);

  return {
    companies,
    originalCompanies,
    isFetching,
    isGetError,
    handleNameChange,
    handleSlideChange,
    handleFileSelect,
    removeImage,
    removeSlideById,
    removeCompanyByIndex,
    addSlide,
    addCompany,
    saveCompanyDetail,
    saveSingleCompanyDetail,
  };
};
