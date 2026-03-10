"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import GlobalUpdateModal from "../../../../components/Global/UpdateInfoModal";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { useAboutServicesUpdate } from "../hooks/useAboutService";

const languages = ["en", "ar", "tr"];

const AboutServicesUpdate = () => {
  const {
    data,
    isLoading,
    isUpdating,
    isError,
    refetch,
    handleChange,
    handleListChange,
    addListItem,
    removeListItem,
    handleUpdate,
  } = useAboutServicesUpdate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang?.toUpperCase(),
    icon: "ki-outline ki-translate",
    content: (
      <div className="flex flex-col gap-6">
        {/* List Items */}
        <div className="card p-4 flex flex-col gap-4">
          <h3 className="font-bold flex justify-between items-center">
            Services List
          </h3>
          {data?.list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="flex-column w-[100%]">
                  <div className="input-group flex-1">
                    <span className="btn btn-input w-[12em]">
                      Text ({lang?.toUpperCase()})
                    </span>
                    <input
                      type="text"
                      className="input w-full"
                      value={item?.[lang] || ""}
                      placeholder={`Enter item in ${lang?.toUpperCase()}`}
                      onChange={(e) =>
                        handleListChange(index, lang, e.target.value)
                      }
                    />
                  </div>
                  <div className="input-group flex-1 mt-2">
                    <span className="btn btn-input w-[12em]">
                      Description ({lang?.toUpperCase()})
                    </span>

                    <input
                      type="text"
                      className="input w-full"
                      placeholder={`Enter description in ${lang?.toUpperCase()}`}
                      value={item?.[`${lang}Desc`] || ""}
                      onChange={(e) =>
                        handleListChange(index, `${lang}Desc`, e.target.value)
                      }
                    />
                  </div>
                </div>
                {data?.list.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline btn-danger h-10 w-10 flex items-center justify-center p-0"
                    onClick={() => removeListItem(index)}
                    title="Delete item"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <AddButton label="Add Item" onClick={addListItem} />
          </div>
        </div>

        {/* Content */}
        <div className="card p-4 flex flex-col gap-4">
          <h3 className="font-bold">Content</h3>

          <div className="input-group">
            <span className="btn btn-input w-[12em]">
              Content Title ({lang?.toUpperCase()})
            </span>
            <input
              type="text"
              className="input w-full"
              value={data?.content?.title?.[lang] || ""}
              placeholder={`Enter content title in ${lang?.toUpperCase()}`}
              onChange={(e) =>
                handleChange("content", lang, e.target.value, "title")
              }
            />
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[12em]">
              Paragraph ({lang?.toUpperCase()}) (One each line)
            </span>
            <textarea
              rows="3"
              className="textarea w-full"
              value={data?.content?.text?.[lang]?.join("\n") || ""}
              placeholder={`Enter paragraph in ${lang?.toUpperCase()}`}
              onChange={(e) =>
                handleChange(
                  "content",
                  lang,
                  e.target.value.split("\n"),
                  "text"
                )
              }
            />
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[12em]">
              Highlight ({lang?.toUpperCase()})
            </span>
            <input
              type="text"
              className="input w-full"
              value={data?.content?.highlight?.[lang] || ""}
              placeholder={`Enter highlight in ${lang?.toUpperCase()}`}
              onChange={(e) =>
                handleChange("content", lang, e.target.value, "highlight")
              }
            />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">About Services Dashboard</h1>
        <div className="flex justify-end">
          <AddButton
            label="Save Changes"
            onClick={() => setShowConfirmModal(true)}
          />
          <div className="ml-2">
            <AddButton
              label="Update Titles"
              onClick={() => setShowUpdateTitle(true)}
            />
          </div>
        </div>
      </div>

      <Tabs tabs={tabConfig} />

      <GlobalUpdateModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onUpdate={async () => {
          await handleUpdate();
          setShowConfirmModal(false);
        }}
        isLoading={isUpdating}
        title="Confirm Update"
        text="Are you sure you want to update About Services data?"
        butText="Update"
      />

      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="servicesAbout"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AboutServicesUpdate;
