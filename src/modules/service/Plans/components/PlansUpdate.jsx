"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../../components/Global/AddButton";
import Tabs from "../../../../components/Global/Tabs";
import { Alert } from "@/components";
import GlobalUpdateModal from "../../../../components/Global/UpdateInfoModal";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { usePlansUpdate } from "../hooks/useUpdatePlans";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";

const languages = ["en", "ar", "tr"];

const PlansUpdate = () => {
  const {
    data,
    isLoading,
    isError,
    isUpdating,
    refetch,
    handleItemChange,
    addNewItem,
    removeItem,
    handleUpdate,
  } = usePlansUpdate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    icon: "ki-outline ki-translate",
    content: (
      <div className="flex flex-col gap-6">
        <div className="card p-4 flex flex-col gap-4">
          <h3 className="font-bold flex justify-between items-center">
            Plans List
          </h3>
          <div className="modal-body mt-4">
            <Alert variant="warning" className="capitalize">
              Please fill all translations for each plan. Maximum 150 characters
              for descriptions.
            </Alert>
          </div>

          {data.data.map((item, index) => (
            <div
              key={item.slug}
              className="flex flex-col gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Plan {index + 1}</span>
                {data.data.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline btn-danger h-8 w-8 flex items-center justify-center p-0"
                    onClick={() => removeItem(index)}
                    title="Delete plan"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Plan Title */}
              <div className="input-group flex-1 mb-2">
                <span className="btn btn-input w-[10em]">
                  Title ({lang.toUpperCase()})
                </span>
                <input
                  type="text"
                  className="input w-full"
                  placeholder={`Enter plan title in ${lang.toUpperCase()}`}
                  value={item.title[lang] || ""}
                  onChange={(e) =>
                    handleItemChange(index, "title", lang, e.target.value)
                  }
                />
              </div>

              {/* Plan Description */}
              <div className="input-group flex-1">
                <span className="btn btn-input w-[10em]">
                  Description ({lang.toUpperCase()})
                </span>
                <textarea
                  rows="3"
                  className="textarea w-full"
                  placeholder={`Enter plan description in ${lang.toUpperCase()}`}
                  value={item.desc[lang] || ""}
                  onChange={(e) =>
                    handleItemChange(index, "desc", lang, e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-4">
            <AddButton label="Add New Plan" onClick={addNewItem} />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Plans</h1>
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
        text="Are you sure you want to update Plans data?"
        butText="Update"
      />
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="servicesPlans"
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default PlansUpdate;
