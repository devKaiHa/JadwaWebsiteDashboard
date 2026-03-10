import { useState, useEffect } from "react";
import {
  useGetOneAboutServiceQuery,
  useUpdateAboutServiceMutation,
} from "../../../../rtk/ServicePage/about/AboutServiceApi";
import { toast } from "react-toastify";

export const useAboutServicesUpdate = () => {
  const {
    data: fetchedData,
    isLoading,
    isError,
    refetch,
  } = useGetOneAboutServiceQuery();
  const [updateAboutService, { isLoading: isUpdating }] =
    useUpdateAboutServiceMutation();

  const [data, setData] = useState({
    list: [],
    content: {
      title: { ar: "", arDesc: "", en: "", enDesc: "", tr: "", trDesc: "" },
      text: { ar: [], en: [], tr: [] },
      highlight: { ar: "", en: "", tr: "" },
    },
  });

  useEffect(() => {
    if (fetchedData?.data) {
      setData({
        list: fetchedData.data.list || [],
        content: fetchedData.data.content || {
          title: { ar: "", arDesc: "", en: "", enDesc: "", tr: "", trDesc: "" },
          text: { ar: [], en: [], tr: [] },
          highlight: { ar: "", en: "", tr: "" },
        },
      });
    }
  }, [fetchedData]);

  const handleChange = (section, lang, value, subSection) => {
    if (subSection) {
      setData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: { ...prev[section][subSection], [lang]: value },
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [lang]: value },
      }));
    }
  };

  const handleListChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.list];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, list: updated };
    });
  };

  const addListItem = () => {
    setData((prev) => ({
      ...prev,
      list: [
        ...prev.list,
        { ar: "", en: "", tr: "", arDesc: "", enDesc: "", trDesc: "" },
      ],
    }));
  };

  const removeListItem = (index) => {
    setData((prev) => ({
      ...prev,
      list: prev.list.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async () => {
    for (const item of data.list) {
      if (!item.ar || !item.en || !item.tr) {
        toast.error("Please fill all translations for each list item.");
        return false;
      }
    }

    const contentSections = ["title", "highlight"];
    for (const section of contentSections) {
      for (const lang of ["ar", "en", "tr"]) {
        if (!data.content[section][lang]) {
          toast.error(
            `Please fill the ${section} field in ${lang.toUpperCase()}.`
          );
          return false;
        }
      }
    }

    for (const lang of ["ar", "en", "tr"]) {
      if (
        !data.content.text[lang] ||
        data.content.text[lang].length === 0 ||
        data.content.text[lang].some((line) => !line.trim())
      ) {
        toast.error(
          `Please fill the paragraph content in ${lang.toUpperCase()}.`
        );
        return false;
      }
    }

    try {
      await updateAboutService({ payload: data }).unwrap();
      toast.success("About Services updated successfully");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Failed to update About Services");
      return false;
    }
  };

  return {
    data,
    isLoading,
    isUpdating,
    isError,
    refetch,
    handleChange,
    handleListChange,
    addListItem,
    removeListItem,
    handleUpdate,
  };
};
