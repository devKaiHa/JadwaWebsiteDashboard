import { Container } from "@/components/container";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useContacts, useDeleteContact } from "../useContacts";
import ContactDetailsModal from "./ContactDetailsModal";
import DeleteModal from "../../News/News/DeleteModal";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";

const contactTypeOptions = [
  { label: "All Types", value: "" },
  { label: "Investment", value: "investment" },
  { label: "Partnership", value: "partnership" },
  { label: "Media", value: "media" },
  { label: "Support", value: "support" },
];

const contactStatusOptions = [
  { label: "All Statuses", value: "" },
  { label: "New", value: "new" },
  { label: "Replied", value: "replied" },
  { label: "Archived", value: "archived" },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "new":
      return "badge badge-outline badge-primary";
    case "replied":
      return "badge badge-outline badge-success";
    case "archived":
      return "badge badge-outline badge-warning";
    default:
      return "badge badge-outline";
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

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { contacts, isLoading, error } = useContacts({
    q: query,
    type,
    status,
  });

  const { handleDeleteContact } = useDeleteContact();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const onEnterHit = (e) => {
    if (e.key === "Enter") {
      setQuery(searchQuery);
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeleteContact(selectedId);
      toast.success("Message deleted successfully");
      setShowDelete(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap gap-4">
            <h3 className="card-title">Contact Messages</h3>

            <div className="flex gap-3">
              <div className="relative w-[40%]">
                <i className="ki-outline ki-magnifier absolute top-1/2 left-2 -translate-y-1/2 text-md text-gray-500"></i>
                <input
                  className="input input-sm pl-8"
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={onEnterHit}
                />
              </div>

              <div className="flex w-[60%]">
                <select
                  className="select select-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {contactTypeOptions.map((opt) => (
                    <option key={opt.value || "all"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <select
                  className="select select-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {contactStatusOptions.map((opt) => (
                    <option key={opt.value || "all"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table
                className="table table-auto table-border"
                id="contacts_table"
              >
                <thead>
                  <tr>
                    <th className="min-w-[150px]">Name</th>
                    <th className="min-w-[150px]">Email</th>
                    <th className="min-w-[140px]">Phone</th>
                    <th className="min-w-[120px]">Type</th>
                    <th className="min-w-[150px]">Subject</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="min-w-[180px]">Created At</th>
                    <th className="min-w-[150px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts?.map((item) => (
                    <tr key={item?._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {item?.name || "-"}
                        </span>
                      </td>

                      <td>
                        <Tooltip
                          placement="top"
                          title="Contact"
                          disableInteractive
                        >
                          <span
                            className="text-sm text-gray-700 cursor-pointer"
                            onClick={() => {
                              if (item?.email) {
                                window.open(`mailto:${item?.email}`);
                              } else {
                                toast.error("No email provided");
                              }
                            }}
                          >
                            {item?.email || "-"}
                          </span>
                        </Tooltip>
                      </td>

                      <td>
                        <Tooltip
                          placement="top"
                          title="Contact"
                          disableInteractive
                        >
                          <span
                            className="text-sm text-gray-700 cursor-pointer"
                            onClick={() => {
                              if (item?.phone) {
                                window.open(`tel:${item?.phone}`);
                              } else {
                                toast.error("No phone provided");
                              }
                            }}
                          >
                            {item?.phone || "-"}
                          </span>
                        </Tooltip>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700">
                          {formatType(item?.type)}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700">
                          {item?.subject || "-"}
                        </span>
                      </td>

                      <td>
                        <span className={getStatusBadge(item?.status)}>
                          {item?.status || "-"}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700">
                          {item?.createdAt
                            ? new Date(item?.createdAt).toLocaleString()
                            : "-"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="View / Edit" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                setSelectedId(item?._id);
                                setShowDetails(true);
                              }}
                            >
                              <i className="ki-filled ki-eye text-xl text-primary" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                setSelectedId(item?._id);
                                setShowDelete(true);
                              }}
                            >
                              <i className="ki-filled ki-trash-square text-xl text-danger" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!contacts?.length && (
                    <tr>
                      <td colSpan={8}>
                        <div className="text-center py-10 text-gray-500">
                          No messages found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ContactDetailsModal
        isOpen={showDetails}
        contactId={selectedId}
        onClose={() => {
          setShowDetails(false);
          setSelectedId(null);
        }}
      />

      <DeleteModal
        sh={showDelete}
        onClose={setShowDelete}
        Delete={handleDelete}
      />

      <ToastContainer />
    </Container>
  );
};

export default ContactsList;
