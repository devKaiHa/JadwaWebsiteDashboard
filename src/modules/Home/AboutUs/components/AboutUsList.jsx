import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { ToastContainer, toast } from "react-toastify";
import {
  useUpdateaboutHomeMutation,
  useGetOneaboutHomeQuery,
} from "../../../../rtk/Home/about/aboutApi";
import GlobalUpdateModal from "../../../../components/Global/UpdateInfoModal";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";

const languages = ["en", "ar", "tr"];
const id = "68b021615f1872493d589855";

const AboutUsUpdate = () => {
  const { data: initialData, isLoading, isError } = useGetOneaboutHomeQuery(id);
  const [updateAbout, { isLoading: isUpdating }] = useUpdateaboutHomeMutation();

  const [data, setData] = useState({
    content: { en: "", ar: "", tr: "" },
    message: { en: "", ar: "", tr: "" },
    messageDescription: { en: "", ar: "", tr: "" },
    vision: { en: "", ar: "", tr: "" },
    visionDescription: { en: "", ar: "", tr: "" },
  });
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load data from backend on success
  useEffect(() => {
    if (initialData?.data) {
      const d = initialData.data;
      setData({
        content: d.content || data.content,
        message: d.message || data.message,
        messageDescription: d.messageDescription || data.messageDescription,
        vision: d.vision || data.vision,
        visionDescription: d.visionDescription || data.visionDescription,
      });
    }
  }, [initialData]);

  const handleLangChange = (section, lang, value) => {
    setData({
      ...data,
      [section]: { ...data[section], [lang]: value },
    });
  };

  const handleSaveClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateAbout({ id, body: data }).unwrap();
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
        {/* Main Content */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Content ({lang.toUpperCase()})
          </label>
          <textarea
            rows="4"
            className="textarea w-full"
            value={data.content[lang]}
            onChange={(e) => handleLangChange("content", lang, e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Message ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            className="input w-full"
            value={data.message[lang]}
            onChange={(e) => handleLangChange("message", lang, e.target.value)}
          />
          <label className="block font-medium mb-1">
            Message Description ({lang.toUpperCase()})
          </label>
          <textarea
            rows="3"
            className="textarea w-full"
            value={data.messageDescription[lang]}
            onChange={(e) =>
              handleLangChange("messageDescription", lang, e.target.value)
            }
          />
        </div>

        {/* Vision */}
        <div className="card p-4 flex flex-col gap-4">
          <label className="block font-medium mb-1">
            Vision ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            className="input w-full"
            value={data.vision[lang]}
            onChange={(e) => handleLangChange("vision", lang, e.target.value)}
          />
          <label className="block font-medium mb-1">
            Vision Description ({lang.toUpperCase()})
          </label>
          <textarea
            rows="3"
            className="textarea w-full"
            value={data.visionDescription[lang]}
            onChange={(e) =>
              handleLangChange("visionDescription", lang, e.target.value)
            }
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
        type="homeAbout"
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AboutUsUpdate;
