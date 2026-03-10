import { useState } from "react";
import {
  useCreateBlogCateoryMutation,
  useGetAllBlogCategoriesQuery,
} from "../../../../rtk/Blog/BlogCateoryApi";
import { toast } from "react-toastify";

const useAddBlogCategory = (onClose) => {
  const [createBlogCategory, { isLoading }] = useCreateBlogCateoryMutation();
  const { refetch: refetchCategories } = useGetAllBlogCategoriesQuery();

  const [category, setCategory] = useState({
    name: {
      en: "",
      ar: "",
      tr: "",
    },
  });

  const [errors, setErrors] = useState({});

  // تحديث القيم
  const handleChange = (lang, value) => {
    setCategory((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        [lang]: value,
      },
    }));
  };

  // التحقق من الحقول
  const validate = () => {
    const newErrors = {};
    if (!category.name.en.trim()) newErrors.en = "Required";
    if (!category.name.ar.trim()) newErrors.ar = "Required";
    if (!category.name.tr.trim()) newErrors.tr = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // الحفظ
  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name: { ...category.name },
      };

      console.log("📤 Sending:", payload);

      const res = await createBlogCategory(payload).unwrap();
      console.log("✅ Response:", res);

      refetchCategories();
      toast.success("Category Created Successfully");

      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error creating category:", err);
      toast.error("Error creating category!");
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

export default useAddBlogCategory;
