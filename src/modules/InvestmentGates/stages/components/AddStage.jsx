import { Container } from "@/components/container";
import AddButton from "@/components/Global/AddButton";
import Tabs from "@/components/Global/Tabs";
import useAddStage from "../hooks/useAddStage";
import { ToastContainer } from "react-toastify";

const languages = ["en", "ar", "tr"];

const AddStagePage = () => {
  const {
    formData,
    handleSave,
    isLoading,
    handleStepChange,
    addStep,
    removeStep,
    handleTitleChange,
  } = useAddStage();

  const getPlaceholder = (field, lang) => {
    if (field === "title") return `Enter title in ${lang.toUpperCase()}`;
    if (field === "description")
      return `Enter description in ${lang.toUpperCase()}`;
    return "";
  };

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    content: (
      <div className="flex flex-col gap-6">
        {/* Stage Title */}
        <div className="card p-5 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Stage Title</h2>
          <div className="input-group mb-3">
            <span className="btn btn-input w-[9em]">{`Title (${lang.toUpperCase()})`}</span>
            <input
              type="text"
              placeholder={getPlaceholder("title", lang)}
              value={formData.title?.[lang] || ""}
              onChange={(e) => handleTitleChange(lang, e.target.value)}
              className="input w-full"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="card p-5 shadow-md rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Steps</h2>
            <button
              className="btn btn-primary btn-sm"
              onClick={addStep}
              disabled={isLoading}
            >
              Add Step
            </button>
          </div>

          {formData.steps.map((step, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Step {index + 1}</span>
                {formData.steps.length > 1 && (
                  <button
                    className="btn btn-sm btn-outline btn-danger w-[6em]"
                    onClick={() => removeStep(index)}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                )}
              </div>

              {["title", "description"].map((field) => (
                <div key={field} className="mb-3">
                  <h4 className="font-semibold mb-2 capitalize">{field}</h4>
                  <div className="input-group mb-2">
                    <span className="btn btn-input w-[12em]">{`${field} (${lang.toUpperCase()})`}</span>
                    {field === "description" ? (
                      <textarea
                        placeholder={getPlaceholder(field, lang)}
                        value={step[field]?.[lang] || ""}
                        onChange={(e) =>
                          handleStepChange(index, field, lang, e.target.value)
                        }
                        className="textarea w-full"
                        rows={4}
                        disabled={isLoading}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={getPlaceholder(field, lang)}
                        value={step[field]?.[lang] || ""}
                        onChange={(e) =>
                          handleStepChange(index, field, lang, e.target.value)
                        }
                        className="input w-full"
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Stage</h1>
        <AddButton
          label="Save Stage"
          onClick={handleSave}
          disabled={isLoading}
        />
      </div>

      <Tabs tabs={tabConfig} />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddStagePage;
