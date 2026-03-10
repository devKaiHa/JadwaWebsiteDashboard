import { useState, useEffect } from "react";
import { Alert } from "@/components";
import { CrudAvatarUpload } from "../../../../partials/crud/CrudAvatarUpload";
import { useGetAllBlogCategoriesQuery } from "../../../../rtk/Blog/BlogCateoryApi";

const GeneralInfoTab = ({
  category,
  setCategory,
  tagsEN,
  setTagsEN,
  tagsAR,
  setTagsAR,
  tagsTR,
  setTagsTR,
  coverPreview,
  onCoverChange,
  thumbnailPreviews,
  onThumbnailsChange,
}) => {
  const { data: categories, isLoading, error } = useGetAllBlogCategoriesQuery();

  const [tagsInput, setTagsInput] = useState({
    en: (tagsEN || []).join(", "),
    ar: (tagsAR || []).join(", "),
    tr: (tagsTR || []).join(", "),
  });

  useEffect(() => {
    setTagsInput({
      en: (tagsEN || []).join(", "),
      ar: (tagsAR || []).join(", "),
      tr: (tagsTR || []).join(", "),
    });
  }, [tagsEN, tagsAR, tagsTR]);

  const handleTagsBlur = (lang) => {
    const tagsArray = (tagsInput[lang] || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (lang === "en") setTagsEN(tagsArray);
    if (lang === "ar") setTagsAR(tagsArray);
    if (lang === "tr") setTagsTR(tagsArray);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left Section: Form Info */}
      <div className="flex-1 card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">General Info</h3>
        </div>
        <div className="card-table scrollable-x-auto pb-3">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              {/* Category */}
              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Blog Category</span>
                    <select
                      name="category"
                      value={category || ""}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input"
                      disabled={isLoading || error}
                    >
                      <option value="">Select Category</option>
                      {categories?.data?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat?.name?.en}
                        </option>
                      ))}
                    </select>
                  </div>
                  {error && (
                    <Alert variant="danger" className="mt-2">
                      Failed to load categories
                    </Alert>
                  )}
                </td>
              </tr>

              {/* Tags */}
              <tr>
                <td className="p-2 pt-4">
                  {["en", "ar", "tr"].map((lang) => (
                    <div className="input-group mb-2" key={lang}>
                      <span className="btn btn-input w-[20%] uppercase">
                        Tags ({lang})
                      </span>
                      <input
                        type="text"
                        name={`tags-${lang}`}
                        className="input"
                        placeholder={`Comma-separated (${lang})`}
                        value={tagsInput[lang] || ""}
                        onChange={(e) =>
                          setTagsInput((prev) => ({
                            ...prev,
                            [lang]: e.target.value,
                          }))
                        }
                        onBlur={() => handleTagsBlur(lang)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.target.blur();
                          }
                        }}
                      />
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section: Images */}
      {/* Right Section: Images */}
      <div className="lg:w-[35%] self-start">
        <div className="card ">
          {/* Cover Image */}
          <div className="card-header">
            <h3 className="card-title">Cover Image</h3>
          </div>
          <div className="p-6">
            <CrudAvatarUpload
              onChange={onCoverChange}
              value={coverPreview}
              initialImageURL={
                typeof coverPreview === "string" ? `${coverPreview}` : ""
              }
              adviceMessage="Cover Image | Max 1MB | Aspect Ratio 16:9"
            />
          </div>
        </div>

        <div className="card bg-white my-2">
          <div className="card-header">
            <h3 className="card-title">Thumbnail Images</h3>
          </div>
          <div className="p-4">
            <input
              type="file"
              multiple
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                onThumbnailsChange({
                  target: { files: [...thumbnailPreviews, ...newFiles] },
                });
              }}
              className="mb-4"
            />

            {/* Preview uploaded file names */}
            {thumbnailPreviews?.length > 0 && (
              <ul className="space-y-2">
                {thumbnailPreviews.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                  >
                    <span className="truncate">{file.name || file}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = [...thumbnailPreviews];
                        newFiles.splice(idx, 1);
                        onThumbnailsChange({ target: { files: newFiles } });
                      }}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
