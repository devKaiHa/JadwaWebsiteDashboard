import { Container } from "@/components/container";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import { useNewsById, useUpdateNews } from "./useNews";
import SearchableSelect from "../../../components/Global/SearchableSelect";
import { useNewsCategories } from "../NewsCategories/useNewsCategories";

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    newsItem,
    isLoading: isFetching,
    error: fetchError,
  } = useNewsById(id);
  const { handleUpdateNews, isLoading: isUpdating } = useUpdateNews();

  const {
    response: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useNewsCategories({
    // if supported:
    // isActive: true,
    // page: 1,
    // limit: 200,
  });

  const categories = categoriesResponse?.data || [];

  const [formData, setFormData] = useState({
    title: { en: "", ar: "" },
    excerpt: { en: "", ar: "" },
    content: { en: "", ar: "" },
    image: "",
    category: "", // categoryId
    author: "",
    readTime: 0,
    isPublished: false,
    order: 0,
  });

  // derive selected category label (optional - helps your SearchableSelect show label)
  const selectedCategoryLabel = useMemo(() => {
    const found = categories.find(
      (c) => c?._id === formData.category || c?.id === formData.category,
    );
    if (!found) return "";
    return found?.name?.en || found?.name?.ar || found?.name?.tr || "";
  }, [categories, formData.category]);

  // initialize form when news is loaded
  useEffect(() => {
    if (!newsItem) return;

    setFormData({
      title: {
        en: newsItem?.title?.en || "",
        ar: newsItem?.title?.ar || "",
      },
      excerpt: {
        en: newsItem?.excerpt?.en || "",
        ar: newsItem?.excerpt?.ar || "",
      },
      content: {
        en: newsItem?.content?.en || "",
        ar: newsItem?.content?.ar || "",
      },
      image: newsItem?.image || "",
      category: newsItem?.category?._id,
      author: newsItem?.author || "",
      readTime: Number(newsItem?.readTime) || 0,
      isPublished: Boolean(newsItem?.isPublished),
      order: Number(newsItem?.order) || 0,
    });
  }, [newsItem]);

  if (isFetching) return <LoadingCard />;
  if (fetchError) return <ErrorMessageCard />;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        readTime: Number(formData.readTime) || 0,
        order: Number(formData.order) || 0,
      };

      await handleUpdateNews({ id, payload });
      toast.success("News updated successfully");

      navigate("/news");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update news");
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Edit News</h3>

            <div className="flex gap-3">
              <Tooltip title="Back" placement="top">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => navigate("/news")}
                >
                  Back
                </button>
              </Tooltip>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card-body grid gap-6">
              {/* Title */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Title (EN)</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.title.en}
                    onChange={(e) =>
                      handleNestedChange("title", "en", e.target.value)
                    }
                    placeholder="Enter English title"
                  />
                </div>

                <div>
                  <label className="form-label">Title (AR)</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.title.ar}
                    onChange={(e) =>
                      handleNestedChange("title", "ar", e.target.value)
                    }
                    placeholder="Enter Arabic title"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Category</label>

                  <SearchableSelect
                    label="Category"
                    placeholder={
                      categoriesLoading
                        ? "Loading categories..."
                        : "Select category..."
                    }
                    options={{ data: categories }}
                    selectedValue={formData.category}
                    selectedLabel={selectedCategoryLabel}
                    disabled={categoriesLoading || !!categoriesError}
                    error={!formData.category}
                    getOptionLabel={(opt) =>
                      opt?.name?.en || opt?.name?.ar || opt?.name?.tr || "—"
                    }
                    onChange={(option) => {
                      handleChange("category", option?._id || option?.id || "");
                    }}
                  />

                  {categoriesError && (
                    <div className="text-danger text-xs mt-1">
                      Failed to load categories
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Excerpt (EN)</label>
                  <textarea
                    className="textarea"
                    rows={4}
                    value={formData.excerpt.en}
                    onChange={(e) =>
                      handleNestedChange("excerpt", "en", e.target.value)
                    }
                    placeholder="Enter English excerpt"
                  />
                </div>

                <div>
                  <label className="form-label">Excerpt (AR)</label>
                  <textarea
                    className="textarea"
                    rows={4}
                    value={formData.excerpt.ar}
                    onChange={(e) =>
                      handleNestedChange("excerpt", "ar", e.target.value)
                    }
                    placeholder="Enter Arabic excerpt"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Content (EN)</label>
                  <textarea
                    className="textarea"
                    rows={10}
                    value={formData.content.en}
                    onChange={(e) =>
                      handleNestedChange("content", "en", e.target.value)
                    }
                    placeholder="Enter English content"
                  />
                </div>

                <div>
                  <label className="form-label">Content (AR)</label>
                  <textarea
                    className="textarea"
                    rows={10}
                    value={formData.content.ar}
                    onChange={(e) =>
                      handleNestedChange("content", "ar", e.target.value)
                    }
                    placeholder="Enter Arabic content"
                  />
                </div>
              </div>

              {/* Image + Author */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Image</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    placeholder="Image URL"
                  />
                </div>

                <div>
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    placeholder="Author name"
                  />
                </div>
              </div>

              {/* ReadTime + Order */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Read Time</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.readTime}
                    onChange={(e) => handleChange("readTime", e.target.value)}
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.order}
                    onChange={(e) => handleChange("order", e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Published */}
              <div className="flex items-center gap-3">
                <label className="form-label m-0">Publish</label>
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    handleChange("isPublished", e.target.checked)
                  }
                />
              </div>
            </div>

            <div className="card-footer flex justify-end gap-3">
              <Tooltip title="Cancel" placement="top">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => navigate("/news")}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </Tooltip>

              <Tooltip title="Update News" placement="top">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Update News"}
                </button>
              </Tooltip>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default EditNews;
