"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../components/Global/AddButton";
import Tabs from "../../../components/Global/Tabs";
import {
  useUpdateContactMutation,
  useGetOneContactQuery,
} from "../../../rtk/Contact/contactApi";
import GlobalUpdateModal from "../../../components/Global/UpdateInfoModal";
import { toast, ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const languages = ["en", "ar", "tr"];
const ContactDashboard = () => {
  const { data: fetchedData, isLoading, isError } = useGetOneContactQuery();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [data, setData] = useState({
    title: { en: "", ar: "", tr: "" },
    description: { en: "", ar: "", tr: "" },
    formTitle: { en: "", ar: "", tr: "" },
    address: { en: "", ar: "", tr: "" },
    nameLabel: { en: "", ar: "", tr: "" },
    emailLabel: { en: "", ar: "", tr: "" },
    phoneLabel: { en: "", ar: "", tr: "" },
    messageLabel: { en: "", ar: "", tr: "" },
    submitLabel: { en: "", ar: "", tr: "" },
    contactUsText: { en: "", ar: "", tr: "" },
    phone: "",
    email: "",
    socials: [
      { platform: "Facebook", url: "" },
      { platform: "Twitter", url: "" },
      { platform: "Instagram", url: "" },
      { platform: "LinkedIn", url: "" },
    ],
  });

  useEffect(() => {
    if (fetchedData?.data) {
      const d = fetchedData.data;
      setData({
        title: d.title || { en: "", ar: "", tr: "" },
        description: d.description || { en: "", ar: "", tr: "" },
        formTitle: d.formTitle || { en: "", ar: "", tr: "" },
        address: d.address || { en: "", ar: "", tr: "" },
        nameLabel: d.nameLabel || { en: "", ar: "", tr: "" },
        emailLabel: d.emailLabel || { en: "", ar: "", tr: "" },
        phoneLabel: d.phoneLabel || { en: "", ar: "", tr: "" },
        messageLabel: d.messageLabel || { en: "", ar: "", tr: "" },
        submitLabel: d.submitLabel || { en: "", ar: "", tr: "" },
        phone: d.phone || "",
        email: d.email || "",
        socials: d.socials || [
          { platform: "Facebook", url: "" },
          { platform: "Twitter", url: "" },
          { platform: "Instagram", url: "" },
          { platform: "LinkedIn", url: "" },
        ],
      });
    }
  }, [fetchedData]);

  const handleTextChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...data.socials];
    updatedSocials[index] = {
      ...updatedSocials[index],
      [field]: value,
    };
    setData((prev) => ({ ...prev, socials: updatedSocials }));
  };

  const handleSave = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateContact(data).unwrap();
      setShowConfirmModal(false);
      toast.success("Contact Us section updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Contact Us section Failed To update");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;
  const tabConfig = languages.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    content: (
      <div className="flex flex-col gap-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">
            Translations ({lang.toUpperCase()})
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Title ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder={`Enter title in ${lang.toUpperCase()}`}
                value={data.title[lang] || ""}
                onChange={(e) =>
                  handleTextChange("title", lang, e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Description ({lang.toUpperCase()})
              </label>
              <textarea
                rows="3"
                className="textarea w-full"
                placeholder={`Enter description in ${lang.toUpperCase()}`}
                value={data.description[lang] || ""}
                onChange={(e) =>
                  handleTextChange("description", lang, e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Address ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder={`Enter address in ${lang.toUpperCase()}`}
                value={data.address[lang] || ""}
                onChange={(e) =>
                  handleTextChange("address", lang, e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Information Dashboard</h1>
        <AddButton
          label={isUpdating ? "Saving..." : "Save Changes"}
          onClick={handleSave}
          disabled={isUpdating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Basic Info */}
        <div className="card p-4 space-y-4">
          <h3 className="font-semibold mb-2">Basic Contact Info</h3>
          <div className="input-group">
            <span className="btn btn-input w-[8em]">Phone</span>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter phone number"
              value={data.phone || ""}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="input-group">
            <span className="btn btn-input w-[8em]">Email</span>
            <input
              type="email"
              className="input w-full"
              placeholder="Enter email address"
              value={data.email || ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="card p-4 space-y-4">
          <h3 className="font-semibold mb-2">Social Media</h3>
          {data.socials.map((social, index) => (
            <div key={index} className="input-group">
              <span className="btn btn-input w-[8em]">{social.platform}</span>
              <input
                type="url"
                className="input w-full"
                placeholder={`Enter ${social.platform} URL`}
                value={social.url || ""}
                onChange={(e) =>
                  handleSocialChange(index, "url", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Language Tabs */}
      <div className="card p-4">
        <Tabs tabs={tabConfig} />
      </div>

      {/* Confirmation Modal */}
      <GlobalUpdateModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onUpdate={handleConfirmUpdate}
        isLoading={isUpdating}
        title="Confirm Data Update"
        text="Are you sure you want to update the contact information? The changes you made will be saved."
        butText="Update"
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default ContactDashboard;
