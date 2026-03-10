import { useState, useEffect } from "react";
import {
  useGetOnePlansServiceQuery,
  useUpdatePlansServiceMutation,
} from "../../../../rtk/ServicePage/plans/PlansApi";
import { toast } from "react-toastify";

export const usePlansUpdate = () => {
  const {
    data: fetchedData,
    isLoading,
    isError,
    refetch,
  } = useGetOnePlansServiceQuery();
  const [updatePlans, { isLoading: isUpdating }] =
    useUpdatePlansServiceMutation();

  const [data, setData] = useState({
    title: { en: "", ar: "", tr: "" },
    subtitle: { en: "", ar: "", tr: "" },
    data: [],
  });

  useEffect(() => {
    if (fetchedData?.data) {
      const d = fetchedData.data;
      setData({
        title: d.title || { en: "", ar: "", tr: "" },
        subtitle: d.subtitle || { en: "", ar: "", tr: "" },
        data:
          d.data?.map((item) => ({
            slug: item._id,
            title: {
              en: item.title.en || "",
              ar: item.title.ar || "",
              tr: item.title.tr || "",
            },
            desc: {
              en: item.desc.en || "",
              ar: item.desc.ar || "",
              tr: item.desc.tr || "",
            },
          })) || [],
      });
    }
  }, [fetchedData]);

  const handleLangChange = (section, lang, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [lang]: value || "" },
    }));
  };

  const handleItemChange = (index, field, lang, value) => {
    setData((prev) => {
      const updatedItems = [...prev.data];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: { ...updatedItems[index][field], [lang]: value || "" },
      };
      return { ...prev, data: updatedItems };
    });
  };

  const addNewItem = () => {
    setData((prev) => ({
      ...prev,
      data: [
        ...prev.data,
        {
          slug: `plan-${Date.now()}`,
          title: { en: "", ar: "", tr: "" },
          desc: { en: "", ar: "", tr: "" },
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== index),
    }));
  };

  const validateData = () => {
    for (const item of data.data) {
      for (const lang of ["en", "ar", "tr"]) {
        if (!item.title[lang]?.trim() || !item.desc[lang]?.trim()) {
          return false;
        }
      }
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateData()) {
      toast.error("Please fill all translations for every plan before saving.");
      return;
    }

    try {
      const payload = {
        data: data.data.map((item) => ({
          title: item.title,
          desc: item.desc,
        })),
      };
      await updatePlans({ payload }).unwrap();
      toast.success("Plans updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Plans");
    }
  };

  return {
    data,
    isLoading,
    isError,
    isUpdating,
    refetch,
    handleLangChange,
    handleItemChange,
    addNewItem,
    removeItem,
    handleUpdate,
  };
};
