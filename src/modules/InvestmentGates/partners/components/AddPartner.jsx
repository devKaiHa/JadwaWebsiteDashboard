import { Container } from "@/components/container";
import { X } from "lucide-react";
import AddButton from "../../../../components/Global/AddButton";
import { usePostPartner } from "../hooks/useAddPartner"; // hook جديد
import { ToastContainer } from "react-toastify";
import { Alert } from "@/components";

function AddPartnerCard() {
  const {
    formData,
    setFormData,
    handleImageChange,
    preview,
    setPreview,
    errors,
    handlePost,
    isLoading,
    titles,
  } = usePostPartner();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, logo: null });
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
        <AddButton label="Save" onClick={handlePost} disabled={isLoading} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Logo */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 shadow-lg rounded-2xl w-full">
            <h2 className="text-xl font-bold text-center mb-4">
              Add Partner Logo
            </h2>
            <div className="w-full h-52 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <img
                src={preview || "/public/assets/service-detailes.jpg"}
                alt="Partner Logo"
                className="object-contain h-full w-full"
              />
            </div>

            {formData.logo && (
              <div className="flex justify-between mt-2 bg-gray-100 p-2 border rounded-md">
                <span className="text-sm">{formData.logo.name}</span>
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
              Logo size must be less than 2MB.{" "}
            </Alert>
          </div>
        </div>

        {/* Right: Partner Info */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Languages */}
          {["en", "ar", "tr"].map((lang) => (
            <div className="card" key={lang}>
              <div className="card-header flex items-center justify-between">
                <h3 className="card-title">{lang.toUpperCase()} Information</h3>
              </div>
              <div className="card-table scrollable-x-auto pb-3">
                <table className="table-auto w-full text-sm text-gray-600">
                  <tbody>
                    {/* Name */}
                    <tr>
                      <td className="p-2 pt-4">
                        <div className="input-group">
                          <span className="btn btn-input w-[8em]">
                            Name ({lang.toUpperCase()})
                          </span>
                          <input
                            placeholder={`Name (${lang.toUpperCase()})`}
                            type="text"
                            value={formData.name[lang] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: {
                                  ...formData.name,
                                  [lang]: e.target.value,
                                },
                              })
                            }
                            className={`input ${
                              errors[`name${lang.toUpperCase()}`]
                                ? "border border-red-500"
                                : ""
                            }`}
                            disabled={isLoading}
                          />
                        </div>
                      </td>
                    </tr>
                    {/* Description */}
                    <tr>
                      <td className="p-2 pt-4">
                        <label className="block font-medium mb-1">
                          Description ({lang.toUpperCase()})
                        </label>
                        <textarea
                          rows="5"
                          placeholder={`Enter short ${lang.toUpperCase()} description (80–100 characters)`}
                          value={formData.description[lang] || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              description: {
                                ...formData.description,
                                [lang]: value,
                              },
                            });
                          }}
                          className={`textarea w-full ${
                            errors[`description${lang.toUpperCase()}`]
                              ? "border border-red-500"
                              : ""
                          }`}
                          disabled={isLoading}
                        ></textarea>
                        <div className="flex justify-between mt-1 text-sm">
                          <span
                            className={
                              getDescStatus(formData.description[lang]).color
                            }
                          >
                            {getDescStatus(formData.description[lang]).msg}
                          </span>
                          <span className="text-gray-500">
                            {formData.description[lang]?.length || 0}/500
                            characters
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
}

export default AddPartnerCard;
