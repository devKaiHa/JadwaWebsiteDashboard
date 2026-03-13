"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetOneStratgicServiceQuery,
  useUpdateStratgicServiceMutation,
} from "../../../../rtk/ServicePage/Stratgic/StratgicApi";

export const useStrategicDirections = () => {
  const {
    data: fetchedData,
    isLoading,
    isError,
    refetch,
  } = useGetOneStratgicServiceQuery();
  const [updateData, { isLoading: isUpdating }] =
    useUpdateStratgicServiceMutation();

  const [data, setData] = useState({
    title: { en: "", ar: "", tr: "" },
    subtitle: { en: "", ar: "", tr: "" },
    data: [],
  });

  useEffect(() => {
    if (fetchedData?.data) {
      setData({
        title: { ...fetchedData.data.title } || { en: "", ar: "", tr: "" },
        subtitle: { ...fetchedData.data.subtitle } || {
          en: "",
          ar: "",
          tr: "",
        },
        data:
          fetchedData.data.data?.map((item) => ({
            slug: item._id,
            title: { ...item.title },
          })) || [],
      });
    }
  }, [fetchedData]);

  const handleLangChange = (section, lang, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [lang]: value },
    }));
  };

  const handleItemChange = (index, lang, value) => {
    setData((prev) => {
      const updatedItems = [...prev.data];
      updatedItems[index] = {
        ...updatedItems[index],
        title: { ...updatedItems[index].title, [lang]: value },
      };
      return { ...prev, data: updatedItems };
    });
  };

  const addNewItem = () => {
    setData((prev) => ({
      ...prev,
      data: [
        ...prev.data,
        { slug: `new-${Date.now()}`, title: { en: "", ar: "", tr: "" } },
      ],
    }));
  };

  const removeItem = (index) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async () => {
    for (const item of data.data) {
      if (!item.title.en || !item.title.ar || !item.title.tr) {
        toast.error(
          "Please fill all translations for each item before saving.",
        );
        return;
      }
    }

    try {
      const payload = {
        data: data.data.map((item) => ({ title: item.title })),
      };
      await updateData({ payload }).unwrap();
      toast.success("Strategic Directions updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Strategic Directions");
    }
  };

  return {
    data,
    isLoading,
    isUpdating,
    isError,
    refetch,
    handleLangChange,
    handleItemChange,
    addNewItem,
    removeItem,
    handleUpdate,
  };
};
