import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetAllHmeCompaniesQuery,
  usePostHomeCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompnayMutation,
} from "../../../../rtk/Home/companies/CompaniesApi";

export const useHomeCompany = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();

  const [createCompany, { isLoading }] = usePostHomeCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompnayMutation();

  const {
    data: slides,
    isLoading: GetLoad,
    isError,
    refetch,
  } = useGetAllHmeCompaniesQuery(`keyword=${name}&limit=10000`);

  const [data, setData] = useState([
    {
      _id: null,
      title: { en: "", ar: "", tr: "" },
      category: { en: "", ar: "", tr: "" },
      img: "",
      preview: null,
      file: null,
    },
  ]);

  useEffect(() => {
    if (slides?.data?.length) {
      setData(
        slides.data.map((item) => ({
          _id: item._id,
          title: { ...item.title },
          category: { ...item.category },
          img: item.img || "",
          preview: item.img || null,
          file: null,
        }))
      );
    }
  }, [slides]);

  const addItem = () => {
    setData((prev) => [
      ...prev,
      {
        _id: null,
        title: { en: "", ar: "", tr: "" },
        category: { en: "", ar: "", tr: "" },
        img: "",
        preview: null,
        file: null,
      },
    ]);
  };

  const removeItem = async (index, id) => {
    try {
      if (id) {
        await deleteCompany(id).unwrap();
        toast.success("Slide deleted successfully!");
        refetch();
      } else {
        setData((prev) => prev.filter((_, i) => i !== index));
        toast.info("Slide removed locally!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while deleting slide");
    }
  };

  const handleItemChange = (index, field, lang, value) => {
    setData((prev) => {
      const newItems = [...prev];
      if (field === "img") {
        newItems[index].img = value;
        newItems[index].preview = value;
      } else if (lang) {
        newItems[index][field] = { ...newItems[index][field], [lang]: value };
      } else {
        newItems[index][field] = value;
      }
      return newItems;
    });
  };

  const handleFileSelect = (file, index) => {
    if (!file) return;
    setData((prev) => {
      const newItems = [...prev];
      newItems[index].file = file;
      newItems[index].preview = URL.createObjectURL(file);
      return newItems;
    });
  };

  const removeImage = (index) => {
    setData((prev) => {
      const newItems = [...prev];
      newItems[index].file = null;
      newItems[index].img = "";
      newItems[index].preview = null;
      return newItems;
    });
    toast.info("Image removed!");
  };

  // حفظ جميع التعديلات دفعة واحدة
  const handleSave = async () => {
    try {
      for (const slide of data) {
        const formData = new FormData();
        Object.entries(slide.title).forEach(([lang, value]) =>
          formData.append(`title[${lang}]`, value)
        );
        Object.entries(slide.category).forEach(([lang, value]) =>
          formData.append(`category[${lang}]`, value)
        );
        if (slide.file) formData.append("img", slide.file);

        if (!slide._id) {
          // Slide جديد
          formData.append("name", id);
          await createCompany(formData).unwrap();
        } else {
          // Slide موجود → تحديث
          await updateCompany({ id: slide._id, body: formData }).unwrap();
        }
      }

      toast.success("All slides saved successfully!");
      refetch();
      setTimeout(() => navigate("/home-companies"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Error while saving slides");
    }
  };

  return {
    data,
    isLoading,
    GetLoad,
    isError,
    addItem,
    removeItem,
    handleItemChange,
    handleFileSelect,
    removeImage,
    handleSave,
    refetch,
  };
};
