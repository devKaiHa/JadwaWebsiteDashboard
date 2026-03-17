import { Container } from "@/components/container";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";
import { useCreateNews } from "./useNews";
import SearchableSelect from "../../../components/Global/SearchableSelect";
import { useNewsCategories } from "../NewsCategories/useNewsCategories";

const AddNews = () => {
  const navigate = useNavigate();
  const { handleCreateNews, isLoading } = useCreateNews();
  const userObj = localStorage.getItem("_u_7721");
  const user = userObj ? JSON.parse(userObj) : null;

  const {
    response: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useNewsCategories({
    isActive: true,
    // q: "",
    // page: 1,
    // limit: 100,
  });

  const [formData, setFormData] = useState({
    title: {
      en: "",
      ar: "",
    },
    excerpt: {
      en: "",
      ar: "",
    },
    content: {
      en: "",
      ar: "",
    },
    image: "",
    category: "",
    author: user.name,
    readTime: 0,
    isPublished: false,
    order: 0,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
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

      await handleCreateNews(payload);
      toast.success("News created successfully");

      setTimeout(() => {
        navigate("/news");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create news");
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5">
            <h3 className="card-title">Add News</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card-body grid gap-6">
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
                    options={{ data: categoriesResponse?.data || [] }}
                    selectedValue={formData.category}
                    disabled={categoriesLoading || !!categoriesError}
                    getOptionLabel={(opt) =>
                      opt?.name?.en || opt?.name?.ar || opt?.name?.tr || "—"
                    }
                    onChange={(option) => {
                      setFormData((prev) => ({
                        ...prev,
                        category: option?._id || option?.id || "",
                      }));
                    }}
                  />

                  {categoriesError && (
                    <div className="text-danger text-xs mt-1">
                      Failed to load categories
                    </div>
                  )}
                </div>
              </div>

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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Content (EN)</label>
                  <textarea
                    className="textarea"
                    rows={8}
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
                    rows={8}
                    value={formData.content.ar}
                    onChange={(e) =>
                      handleNestedChange("content", "ar", e.target.value)
                    }
                    placeholder="Enter Arabic content"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Image</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    placeholder="Enter author name"
                  />
                </div>
              </div>

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

              <div className="flex items-center gap-3">
                <label className="form-label m-0">Publish now</label>
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
                >
                  Cancel
                </button>
              </Tooltip>

              <Tooltip title="Save News" placement="top">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Create News"}
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

export default AddNews;
