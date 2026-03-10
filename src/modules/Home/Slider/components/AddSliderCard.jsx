import { Container } from "@/components/container";
import { X } from "lucide-react";
import AddButton from "../../../../components/Global/AddButton";
import { UsePostHomeSlider } from "../hooks/usePostHomeSlider";
import { ToastContainer } from "react-toastify";
import { Alert } from "@/components";

function AddSliderCard() {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    setPreview,
    errors,
    handlePost,
    isLoading,
  } = UsePostHomeSlider();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, background: null });
    setPreview(null);
  };

  const getDescStatus = (text = "") => {
    if (text.length < 1)
      return { color: "text-red-500", msg: `Too short: ${text.length} / 1` };
    if (text.length > 500)
      return { color: "text-red-500", msg: "Too long: Max 500" };
    return {
      color: "text-green-600",
      msg: `Perfect length: ${text.length} / 500`,
    };
  };

  return (
    <Container>
      <div className="flex justify-end mb-5">
        <AddButton label="Save" onClick={handlePost} />
      </div>

      {/* Layout: Left image | Right all language cards */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Image */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 shadow-lg rounded-2xl w-full">
            <h2 className="text-xl font-bold text-center mb-4">Add an image</h2>
            <div className="w-full h-52 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <img
                src={preview || "/public/assets/service-detailes.jpg"}
                alt="Slider"
                className="object-contain h-full w-full"
              />
            </div>

            {formData.background && (
              <div className="flex justify-between mt-2 bg-gray-100 p-2 border rounded-md">
                <span className="text-sm">{formData.background.name}</span>
                <button onClick={removeImage}>
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="mt-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
          <div className="modal-body mt-4">
            <Alert variant="warning" className="capitalize">
              Image size must be less than 2MB.{" "}
            </Alert>
          </div>
        </div>

        {/* Right: Languages stacked */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* English Card */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="card-title">English Information</h3>
            </div>
            <div className="card-table scrollable-x-auto pb-3">
              <table className="table-auto w-full text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="p-2 pt-4">
                      <div className="input-group">
                        <span className="btn btn-input w-[8em]">
                          Title (EN)
                        </span>
                        <input
                          placeholder="English Title"
                          type="text"
                          value={formData.title.en || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: { ...formData.title, en: e.target.value },
                            })
                          }
                          className={`input ${errors.titleEN ? "border border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 pt-4">
                      <label className="block font-medium mb-1">
                        Description (EN)
                      </label>
                      <textarea
                        rows="5"
                        placeholder="Enter short English description (80–100 characters)"
                        value={formData.description.en || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              en: value,
                            },
                          });
                        }}
                        className={`textarea w-full ${errors.descriptionEN ? "border border-red-500" : ""}`}
                      ></textarea>
                      <div className="flex justify-between mt-1 text-sm">
                        <span
                          className={
                            getDescStatus(formData.description.en).color
                          }
                        >
                          {getDescStatus(formData.description.en).msg}
                        </span>
                        <span className="text-gray-500">
                          {formData.description.en?.length || 0}/500 characters
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Arabic Card */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="card-title">Arabic Information</h3>
            </div>
            <div className="card-table scrollable-x-auto pb-3">
              <table className="table-auto w-full text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="p-2 pt-4">
                      <div className="input-group">
                        <span className="btn btn-input w-[8em]">
                          Title (AR)
                        </span>
                        <input
                          placeholder="Arabic Title"
                          type="text"
                          value={formData.title.ar || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: { ...formData.title, ar: e.target.value },
                            })
                          }
                          className={`input ${errors.titleAR ? "border border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 pt-4">
                      <label className="block font-medium mb-1">
                        Description (AR)
                      </label>
                      <textarea
                        rows="5"
                        placeholder="Enter short Arabic description (80–100 characters)"
                        value={formData.description.ar || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              ar: value,
                            },
                          });
                        }}
                        className={`textarea w-full ${errors.descriptionAR ? "border border-red-500" : ""}`}
                      ></textarea>
                      <div className="flex justify-between mt-1 text-sm">
                        <span
                          className={
                            getDescStatus(formData.description.ar).color
                          }
                        >
                          {getDescStatus(formData.description.ar).msg}
                        </span>
                        <span className="text-gray-500">
                          {formData.description.ar?.length || 0}/500 characters
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Turkish Card */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="card-title">Turkish Information</h3>
            </div>
            <div className="card-table scrollable-x-auto pb-3">
              <table className="table-auto w-full text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="p-2 pt-4">
                      <div className="input-group">
                        <span className="btn btn-input w-[8em]">
                          Title (TR)
                        </span>
                        <input
                          placeholder="Turkish Title"
                          type="text"
                          value={formData.title.tr || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: { ...formData.title, tr: e.target.value },
                            })
                          }
                          className={`input ${errors.titleTR ? "border border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 pt-4">
                      <label className="block font-medium mb-1">
                        Description (TR)
                      </label>
                      <textarea
                        rows="5"
                        placeholder="Enter short Turkish description (80–100 characters)"
                        value={formData.description.tr || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              tr: value,
                            },
                          });
                        }}
                        className={`textarea w-full ${errors.descriptionTR ? "border border-red-500" : ""}`}
                      ></textarea>
                      <div className="flex justify-between mt-1 text-sm">
                        <span
                          className={
                            getDescStatus(formData.description.tr).color
                          }
                        >
                          {getDescStatus(formData.description.tr).msg}
                        </span>
                        <span className="text-gray-500">
                          {formData.description.tr?.length || 0}/500 characters
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default AddSliderCard;
