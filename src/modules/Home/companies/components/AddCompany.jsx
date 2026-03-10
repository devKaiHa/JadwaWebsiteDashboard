import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { useHomeCompany } from "../hooks/useManegeSlides";

const languages = ["en", "ar", "tr"];

const AddHomeCompany = () => {
  const {
    data,
    isLoading,
    GetLoad,
    isError,
    addItem,
    removeItem,
    handleItemChange,
    handleFileSelect,
    removeImage,
    handleSave,
    refetch,
  } = useHomeCompany();

  if (GetLoad) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Add / Update Company Slides</h1>
        <div className="flex justify-end">
          <AddButton
            label="Save All Changes"
            onClick={handleSave}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {data.map((item, index) => (
          <div
            key={item._id || index}
            className="card p-4 shadow-lg rounded-xl"
          >
            <h3 className="font-bold flex justify-between items-center mb-4">
              Slide {index + 1}
              <div className="flex gap-2">
                {data.length > 1 && (
                  <button
                    className="btn btn-sm btn-outline btn-danger"
                    onClick={() => removeItem(index, item._id)}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </h3>

            {languages.map((lang) => (
              <div key={lang} className="mb-4 border-b pb-4">
                <h4 className="font-semibold mb-2">{lang.toUpperCase()}</h4>
                <div className="input-group mb-2">
                  <span className="btn btn-input w-[10em]">Title</span>
                  <input
                    type="text"
                    className="input w-full"
                    value={item.title[lang] || ""}
                    onChange={(e) =>
                      handleItemChange(index, "title", lang, e.target.value)
                    }
                    placeholder={`Enter Title (${lang.toUpperCase()})`}
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="btn btn-input w-[10em]">Category</span>
                  <input
                    type="text"
                    className="input w-full"
                    value={item.category[lang] || ""}
                    onChange={(e) =>
                      handleItemChange(index, "category", lang, e.target.value)
                    }
                    placeholder={`Enter Category (${lang.toUpperCase()})`}
                  />
                </div>
              </div>
            ))}

            <div className="input-group flex flex-col gap-2">
              <span>Image</span>
              <input
                type="file"
                accept="image/*"
                className="file-input w-full"
                onChange={(e) => handleFileSelect(e.target.files[0], index)}
              />
              {item.preview && (
                <div className="flex flex-col gap-2 mt-2">
                  <img
                    src={item.preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    className="btn btn-sm btn-outline btn-danger w-[10em]"
                    onClick={() => removeImage(index)}
                  >
                    REMOVE IMAGE
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <AddButton label="Add Slide" onClick={addItem} />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </Container>
  );
};

export default AddHomeCompany;
