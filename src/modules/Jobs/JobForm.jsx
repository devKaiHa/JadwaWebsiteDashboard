import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const JobForm = ({ formData, setFormData, onSubmit, isLoading, onCancel }) => {
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
        ...(prev[parent] || {}),
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="card-body grid gap-6" style={{ padding: "1rem" }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="input-group">
            <span className="btn btn-input w-[20%] capitalize">
              Title (EN) <span className="text-sm text-danger">*</span>
            </span>
            <input
              name="title"
              type="text"
              value={formData.title.en}
              onChange={(e) =>
                handleNestedChange("title", "en", e.target.value)
              }
              className="input"
            />
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[20%] capitalize">
              Title (AR) <span className="text-sm text-danger">*</span>
            </span>
            <input
              name="title"
              type="text"
              value={formData.title.ar}
              onChange={(e) =>
                handleNestedChange("title", "ar", e.target.value)
              }
              className="input"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label mb-2 block">
              Content (EN) <span className="text-sm text-danger">*</span>
            </label>
            <div className="ck-editor-wrapper">
              <CKEditor
                editor={ClassicEditor}
                data={formData.description.en || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleNestedChange("description", "en", data);
                }}
              />
            </div>
          </div>

          <div>
            <label className="form-label mb-2 block">
              Content (AR) <span className="text-sm text-danger">*</span>
            </label>
            <div className="ck-editor-wrapper" dir="rtl">
              <CKEditor
                editor={ClassicEditor}
                data={formData.description.ar || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleNestedChange("description", "ar", data);
                }}
                config={{
                  language: "ar",
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="input-group">
            <span className="btn btn-input w-[40%] capitalize">
              Location <span className="text-sm text-danger">*</span>
            </span>
            <input
              name="title"
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="input"
            />
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[40%] capitalize">
              Type <span className="text-sm text-danger">*</span>
            </span>
            <select
              name="title"
              type="text"
              value={formData.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="input"
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[40%] capitalize">Close Date</span>
            <input
              name="title"
              type="date"
              value={formData.closeDate}
              onChange={(e) => handleChange("closeDate", e.target.value)}
              className="input"
            />
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[40%] capitalize">
              Status <span className="text-sm text-danger">*</span>
            </span>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="input"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-footer flex justify-end gap-3">
        <button type="button" className="btn btn-light" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
