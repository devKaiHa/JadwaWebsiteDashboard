import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContactById, useUpdateContact } from "../useContacts";
import LoadingCard from "../../../components/Global/LoadingCard";

const ContactDetailsModal = ({ isOpen, onClose, contactId }) => {
  const { contact, isLoading: isFetching } = useContactById(contactId);
  const { handleUpdateContact, isLoading: isUpdating } = useUpdateContact();

  const [formData, setFormData] = useState({
    status: "new",
    adminNote: "",
  });

  useEffect(() => {
    if (contact && isOpen) {
      setFormData({
        status: contact.status || "new",
        adminNote: contact.adminNote || "",
      });
    }
  }, [contact, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleUpdateContact({
        id: contactId,
        payload: {
          status: formData.status,
          adminNote: formData.adminNote,
        },
      });

      toast.success("Message updated successfully");
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update message");
    }
  };

  const formatType = (type) => {
    switch (type) {
      case "investment":
        return "Investment";
      case "partnership":
        return "Partnership";
      case "media":
        return "Media";
      case "support":
        return "Support";
      default:
        return type || "-";
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Details
          </h3>

          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {isFetching ? (
          <div className="p-6">
            <LoadingCard />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 px-6 py-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Name</label>
                  <input
                    className="input w-full"
                    value={contact?.name || ""}
                    disabled
                  />
                </div>

                <div>
                  <label className="form-label mb-2 block">Email</label>
                  <input
                    className="input w-full"
                    value={contact?.email || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Phone</label>
                  <input
                    className="input w-full"
                    value={contact?.phone || ""}
                    disabled
                  />
                </div>

                <div>
                  <label className="form-label mb-2 block">Type</label>
                  <input
                    className="input w-full"
                    value={formatType(contact?.type)}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="form-label mb-2 block">Subject</label>
                <input
                  className="input w-full"
                  value={contact?.subject || ""}
                  disabled
                />
              </div>

              <div>
                <label className="form-label mb-2 block">Message</label>
                <textarea
                  className="textarea w-full"
                  rows={6}
                  value={contact?.message || ""}
                  disabled
                />
              </div>

              <div>
                <label className="form-label mb-2 block">Created At</label>
                <input
                  className="input w-full"
                  value={
                    contact?.createdAt
                      ? new Date(contact.createdAt).toLocaleString()
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Status</label>
                  <select
                    className="select w-full"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label mb-2 block">Admin Note</label>
                <textarea
                  className="textarea w-full"
                  rows={5}
                  value={formData.adminNote}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      adminNote: e.target.value,
                    }))
                  }
                  placeholder="Write internal admin notes here..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
                disabled={isUpdating}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactDetailsModal;
