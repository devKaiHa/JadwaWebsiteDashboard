import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useNewsCategoryById,
  useUpdateNewsCategory,
} from "./useNewsCategories";
import LoadingCard from "../../../components/Global/LoadingCard";

const EditNewsCategoryModal = ({ isOpen, onClose, categoryId, onSuccess }) => {
  const { newsCategory, isLoading: isFetching } =
    useNewsCategoryById(categoryId);
  const { handleUpdateNewsCategory, isLoading: isUpdating } =
    useUpdateNewsCategory();

  const [formData, setFormData] = useState({
    name: {
      en: "",
      ar: "",
    },
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    if (newsCategory && isOpen) {
      setFormData({
        name: {
          en: newsCategory?.name?.en || "",
          ar: newsCategory?.name?.ar || "",
        },
        isActive: newsCategory?.isActive ?? true,
        order: newsCategory?.order ?? 0,
      });
    }
  }, [newsCategory, isOpen]);

  if (!isOpen) return null;

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.en.trim() && !formData.name.ar.trim()) {
      toast.error("Please enter at least one category name");
      return;
    }

    try {
      const payload = {
        ...formData,
        order: Number(formData.order) || 0,
      };

      await handleUpdateNewsCategory({
        id: categoryId,
        payload,
      });

      toast.success("News category updated successfully");
      onClose?.();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update news category");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit News Category
          </h3>

          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {isFetching ? (
          <div className="p-6">
            <LoadingCard />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 px-6 py-5">
              <div>
                <label className="form-label mb-2 block">Name (EN)</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter English name"
                  value={formData.name.en}
                  onChange={(e) =>
                    handleNestedChange("name", "en", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="form-label mb-2 block">Name (AR)</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter Arabic name"
                  value={formData.name.ar}
                  onChange={(e) =>
                    handleNestedChange("name", "ar", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="form-label mb-2 block">Order</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="0"
                  value={formData.order}
                  onChange={(e) => handleChange("order", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="editIsActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                />
                <label htmlFor="editIsActive" className="text-sm text-gray-700">
                  Active
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
                disabled={isUpdating}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Update Category"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditNewsCategoryModal;
