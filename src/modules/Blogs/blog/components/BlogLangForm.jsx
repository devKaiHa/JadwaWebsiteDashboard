import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogLangForm = ({ language, value = {}, onChange }) => {
  const [localValue, setLocalValue] = useState({
    title: value.title || "",
    content: value.content || "",
  });

  useEffect(() => {
    setLocalValue({
      title: value.title || "",
      content: value.content || "",
    });
  }, [value.title, value.content]);

  const handleChange = (key, val) => {
    const updated = { ...localValue, [key]: val };
    setLocalValue(updated);
    onChange?.(language, updated);
  };

  return (
    <div className="card-table scrollable-x-auto pb-3">
      <table className="table-auto w-full text-sm text-gray-600">
        <tbody>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Title ({language})
                </span>
                <input
                  name="title"
                  type="text"
                  value={localValue.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={`Enter title in ${language.toUpperCase()}`}
                  className="input"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Content ({language})
                </span>
                <div className="w-full">
                  <ReactQuill
                    value={localValue.content}
                    onChange={(value) => handleChange("content", value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                      "image",
                    ]}
                    className="bg-white text-black min-h-[500px]"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlogLangForm;
