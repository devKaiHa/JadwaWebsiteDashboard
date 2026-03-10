"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../components/Global/AddButton";
import GlobalUpdateModal from "../../../components/Global/UpdateInfoModal";
import {
  useUpdatefooterMutation,
  useGetOneFooterQuery,
} from "../../../rtk/Home/footer/FooterApi";
import { toast, ToastContainer } from "react-toastify";

const languages = ["en", "ar", "tr"];

const FooterUpdate = () => {
  const { data: fetchedData, isLoading } = useGetOneFooterQuery();
  const [updateFooter, { isLoading: isUpdating }] = useUpdatefooterMutation();

  const [data, setData] = useState({
    description: { en: "", ar: "", tr: "" },
    contact: { phone: "", email: "" },
    socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "" },
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (fetchedData?.data) {
      const d = fetchedData.data;
      setData({
        description: d.description || { en: "", ar: "", tr: "" },
        contact: {
          phone: d.phone || "",
          email: d.email || "",
        },
        socialLinks: {
          facebook: d.facebook || "",
          twitter: d.twitter || "",
          instagram: d.instagram || "",
          linkedin: d.linkedin || "",
        },
      });
    }
  }, [fetchedData]);

  const handleChange = (section, field, value, lang) => {
    if (section === "description" && lang) {
      setData({
        ...data,
        description: { ...data.description, [lang]: value },
      });
    } else if (section === "contact" || section === "socialLinks") {
      setData({
        ...data,
        [section]: { ...data[section], [field]: value },
      });
    }
  };

  const handleSaveClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const payload = {
        description: data.description,
        phone: data.contact.phone,
        email: data.contact.email,
        facebook: data.socialLinks.facebook,
        twitter: data.socialLinks.twitter,
        instagram: data.socialLinks.instagram,
        linkedin: data.socialLinks.linkedin,
      };

      await updateFooter({ payload }).unwrap();
      toast.success("Footer section updated successfully");

      setShowConfirmModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update Footer section");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Footer Dashboard</h1>
        <AddButton
          label="Save Changes"
          onClick={handleSaveClick}
          disabled={isUpdating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Company Description */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Company Description</h3>
          </div>
          <div className="card-table p-4">
            {languages.map((lang) => (
              <div key={lang} className="mb-4">
                <label className="block font-medium mb-1">
                  Description ({lang.toUpperCase()})
                </label>
                <textarea
                  rows="3"
                  className="textarea w-full"
                  placeholder={`Enter description in ${lang.toUpperCase()}`}
                  value={data.description[lang] || ""}
                  onChange={(e) =>
                    handleChange("description", null, e.target.value, lang)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Contact Information</h3>
          </div>
          <div className="card-table p-4 flex flex-col gap-4">
            <div className="input-group">
              <span className="btn btn-input w-[8em]">Phone</span>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter phone number"
                value={data.contact.phone || ""}
                onChange={(e) =>
                  handleChange("contact", "phone", e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[8em]">Email</span>
              <input
                type="email"
                className="input w-full"
                placeholder="Enter email address"
                value={data.contact.email || ""}
                onChange={(e) =>
                  handleChange("contact", "email", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Social Links</h3>
        </div>
        <div className="card-table p-4 flex flex-col gap-4">
          {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
            <div key={platform} className="input-group">
              <span className="btn btn-input w-[8em]">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
              <input
                type="url"
                className="input w-full"
                placeholder={`Enter ${platform} URL`}
                value={data.socialLinks?.[platform] || ""}
                onChange={(e) =>
                  handleChange("socialLinks", platform, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <GlobalUpdateModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onUpdate={handleConfirmUpdate}
        isLoading={isUpdating}
        title="Confirm Footer Update"
        text="Are you sure you want to update the Footer data? The changes you made will be saved."
        butText="Update"
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default FooterUpdate;
