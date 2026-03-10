import { useState, useEffect } from "react";
import {
  useGetAllBlogCategoriesQuery,
  useUpdateBlogCateoryMutation,
} from "../../../../rtk/Blog/BlogCateoryApi";
import { toast } from "react-toastify";

const useUpdateCategoryForm = (initialCategory, onClose) => {
  console.log("initialCategory", initialCategory);
  const [updateCategory, { isLoading }] = useUpdateBlogCateoryMutation();
  const { refetch: refetchCategories } = useGetAllBlogCategoriesQuery();

  const [category, setCategory] = useState({
    name: {
      ar: "",
      en: "",
      tr: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleChange = (lang, value) => {
    setCategory((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        [lang]: value,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!category.name.ar.trim()) newErrors.ar = "Required";
    if (!category.name.en.trim()) newErrors.en = "Required";
    if (!category.name.tr.trim()) newErrors.tr = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      await updateCategory({ id: category._id, data: category }).unwrap();
      refetchCategories();
      toast.success("Category Updated Successfully");

      if (onClose) onClose();
    } catch (err) {
      toast.error("Error Updating category!");

      console.error("Error updating category:", err);
    }
  };

  return {
    category,
    errors,
    isLoading,
    handleChange,
    handleSave,
  };
};

export default useUpdateCategoryForm;
