import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { ToastContainer, toast } from "react-toastify";
import {
  useUpdateAboutTurkishMutation,
  useGetOneAboutTurkishQuery,
} from "../../../../rtk/Turkish Citzenship/About/aboutApi";
import GlobalUpdateModal from "../../../../components/Global/UpdateInfoModal";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";

const languages = ["en", "ar", "tr"];

const AboutUsUpdate = () => {
  const {
    data: initialData,
    isLoading,
    isError,
  } = useGetOneAboutTurkishQuery();

  const [updateAbout, { isLoading: isUpdating }] =
    useUpdateAboutTurkishMutation();

  const [data, setData] = useState({
    helper1: { en: "", ar: "", tr: "" },
    helper2: { en: "", ar: "", tr: "" },
    longAbout: { en: "", ar: "", tr: "" },
    yearsExp: { en: "", ar: "", tr: "" },
  });

  const [errors, setErrors] = useState({});
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (initialData?.data) {
      const d = initialData.data;
      setData({
        helper1: d.helper1 || data.helper1,
        helper2: d.helper2 || data.helper2,
        longAbout: d.longAbout || data.longAbout,
        yearsExp: d.yearsExp || data.yearsExp,
      });
    }
  }, [initialData]);

  const handleLangChange = (section, lang, value) => {
    setData({
      ...data,
      [section]: { ...data[section], [lang]: value },
    });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    let firstErrorMessage = null;

    for (const field of ["helper1", "helper2", "longAbout", "yearsExp"]) {
      for (const lang of languages) {
        if (!data[field][lang]?.trim()) {
          newErrors[`${field}_${lang}`] = true;
          if (!firstErrorMessage) {
            firstErrorMessage = `${field} (${lang.toUpperCase()}) is required`;
          }
        }
      }
    }

    setErrors(newErrors);

    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
      return false;
    }
    return true;
  };

  const handleSaveClick = () => {
    if (validate()) {
      setShowConfirmModal(true); // ✅ لا يفتح إلا إذا كل الحقول ممتلئة
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateAbout({ data: data }).unwrap();
      toast.success("About Us section updated successfully");
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update About Us section");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    icon: "ki-outline ki-translate",
    content: (
      <div className="flex flex-col gap-6">
        {/* Helper 1 */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Helper 1 ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            className={`input w-full ${
              errors[`helper1_${lang}`] ? "border-red-500" : ""
            }`}
            value={data.helper1[lang]}
            onChange={(e) => handleLangChange("helper1", lang, e.target.value)}
          />
        </div>

        {/* Helper 2 */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Helper 2 ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            className={`input w-full ${
              errors[`helper2_${lang}`] ? "border-red-500" : ""
            }`}
            value={data.helper2[lang]}
            onChange={(e) => handleLangChange("helper2", lang, e.target.value)}
          />
        </div>

        {/* Long About */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Long About ({lang.toUpperCase()})
          </label>
          <textarea
            rows="4"
            className={`textarea w-full ${
              errors[`longAbout_${lang}`] ? "border-red-500" : ""
            }`}
            value={data.longAbout[lang]}
            onChange={(e) =>
              handleLangChange("longAbout", lang, e.target.value)
            }
          />
        </div>

        {/* Years of Experience */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Years of Experience ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            className={`input w-full ${
              errors[`yearsExp_${lang}`] ? "border-red-500" : ""
            }`}
            value={data.yearsExp[lang]}
            onChange={(e) => handleLangChange("yearsExp", lang, e.target.value)}
          />
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">
          About Us Home Section Dashboard
        </h1>
        <div className="flex justify-end">
          <AddButton label="Save Changes" onClick={handleSaveClick} />
          <div className="ml-2">
            <AddButton
              label="Update Titles"
              onClick={() => setShowUpdateTitle(true)}
            />
          </div>
        </div>
      </div>

      <Tabs tabs={tabConfig} />

      {/* Confirmation Modal */}
      <GlobalUpdateModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onUpdate={handleConfirmUpdate}
        isLoading={isUpdating}
        title="Confirm Data Update"
        text="Are you sure you want to update the About Us data? The changes you made will be saved."
        butText="Update"
      />

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="citizenshipAbout"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AboutUsUpdate;
