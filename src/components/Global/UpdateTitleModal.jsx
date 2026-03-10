import React, { useEffect, useState } from "react";
import { Alert } from "@/components";
import {
  useGetOneTitleQuery,
  useUpdateTitleMutation,
} from "../../rtk/title/TitleApi";
import { toast } from "react-toastify";

const UpdateTitleModal = ({
  isOpen,
  onClose,
  type,
  title = "Update Titles",
  languages = ["en", "ar", "tr"],
  text = "Please update the title information in all languages.",
}) => {
  const [mainTitleData, setMainTitleData] = useState({
    en: "",
    ar: "",
    tr: "",
  });
  const [subTitleData, setSubTitleData] = useState({ en: "", ar: "", tr: "" });

  const {
    data: currentData,
    isLoading: isLoadingData,
    error: fetchError,
  } = useGetOneTitleQuery(type, { skip: !type || !isOpen });

  const [updateTitle, { isLoading: isUpdating, error: updateError }] =
    useUpdateTitleMutation();

  useEffect(() => {
    if (currentData && isOpen) {
      setMainTitleData(currentData?.data?.title || { en: "", ar: "", tr: "" });
      setSubTitleData(
        currentData?.data?.subtitle || { en: "", ar: "", tr: "" }
      );
    }
  }, [currentData, isOpen]);

  useEffect(() => {
    if (fetchError && isOpen) {
      toast.error("Failed to load title data. Please try again.");
    }
  }, [fetchError, isOpen]);

  useEffect(() => {
    if (updateError) {
      toast.error(
        updateError.data?.message || "Failed to update title. Please try again."
      );
    }
  }, [updateError]);

  const handleSave = async () => {
    try {
      const data = {
        id: type,
        title: mainTitleData,
        subtitle: subTitleData,
      };

      const result = await updateTitle({ id: type, data }).unwrap();

      toast.success("Title updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getPlaceholder = (type, lang) => {
    if (type === "main") {
      return lang === "ar"
        ? "Enter main title in Arabic"
        : lang === "en"
          ? "Enter main title in English"
          : "Enter main title in Turkish";
    } else {
      return lang === "ar"
        ? "Enter subtitle in Arabic"
        : lang === "en"
          ? "Enter subtitle in English"
          : "Enter subtitle in Turkish";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[700px] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={onClose}
            disabled={isUpdating}
          >
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        {isLoadingData ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading data...</span>
          </div>
        ) : (
          <>
            {/* Main Title Inputs */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Main Title</h4>
              {languages.map((lang) => (
                <div key={lang} className="mb-3 input-group">
                  <span className="btn btn-input w-[10em]">
                    Title ({lang.toUpperCase()})
                  </span>
                  <input
                    type="text"
                    placeholder={getPlaceholder("main", lang)}
                    className="input w-full"
                    value={mainTitleData[lang] || ""}
                    onChange={(e) =>
                      setMainTitleData({
                        ...mainTitleData,
                        [lang]: e.target.value,
                      })
                    }
                    disabled={isUpdating}
                  />
                </div>
              ))}
            </div>

            {/* Subtitle Inputs */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Subtitle</h4>
              {languages.map((lang) => (
                <div key={lang} className="mb-3 input-group">
                  <span className="btn btn-input w-[10em]">
                    Subtitle ({lang.toUpperCase()})
                  </span>
                  <input
                    type="text"
                    placeholder={getPlaceholder("sub", lang)}
                    className="input w-full"
                    value={subTitleData[lang] || ""}
                    onChange={(e) =>
                      setSubTitleData({
                        ...subTitleData,
                        [lang]: e.target.value,
                      })
                    }
                    disabled={isUpdating}
                  />
                </div>
              ))}
            </div>

            <div className="modal-body mt-4">
              <Alert variant="warning" className="capitalize">
                {text}
              </Alert>
            </div>
          </>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={isUpdating || isLoadingData}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isUpdating || isLoadingData}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTitleModal;
