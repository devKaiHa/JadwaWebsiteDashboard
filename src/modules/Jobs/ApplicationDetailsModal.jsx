import { useEffect, useState } from "react";
import { SquareArrowOutUpRight, Mail, Phone, User } from "lucide-react";
import { toast } from "react-toastify";
import LoadingCard from "../../components/Global/LoadingCard";
import {
  useJobApplicationById,
  useUpdateJobApplication,
} from "./useJobApplications";
import { docUrl } from "../../Api/GlobalData";
import { Tooltip } from "@mui/material";

const getStatusClasses = (status) => {
  switch (status) {
    case "accepted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "reviewing":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const formatStatus = (status) => {
  if (!status) return "-";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const ApplicationDetailsModal = ({ isOpen, onClose, applicationId }) => {
  const { application, isLoading: isFetching } =
    useJobApplicationById(applicationId);
  const { handleUpdateJobApplication, isLoading: isUpdating } =
    useUpdateJobApplication();

  const [formData, setFormData] = useState({
    status: "new",
    adminNote: "",
  });

  useEffect(() => {
    if (application && isOpen) {
      setFormData({
        status: application.status || "new",
        adminNote: application.adminNote || "",
      });
    }
  }, [application, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleUpdateJobApplication({
        id: applicationId,
        payload: {
          status: formData.status,
          adminNote: formData.adminNote,
        },
      });

      toast.success("Application updated successfully");
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update application");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Application Details
          </h3>

          <button
            type="button"
            className="btn btn-xs btn-icon btn-light"
            onClick={onClose}
            disabled={isUpdating}
          >
            ✕
          </button>
        </div>

        {isFetching ? (
          <div className="p-10">
            <LoadingCard />
          </div>
        ) : application ? (
          <form onSubmit={handleSubmit} className="h-full">
            <div className="max-h-[calc(90vh-130px)] overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                {/* Top Summary */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {application?.fullName || "Unnamed Applicant"}
                        </h2>

                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            formData.status || application?.status,
                          )}`}
                        >
                          {formatStatus(formData.status || application?.status)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500">
                        Applied for{" "}
                        <span className="font-medium text-gray-800">
                          {application?.job?.title?.en ||
                            application?.job?.title?.ar ||
                            "-"}
                        </span>
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <Tooltip
                          placement="top"
                          title="Contact"
                          disableInteractive
                        >
                          <span
                            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                            onClick={() =>
                              window.open(`mailto:${application?.email}`)
                            }
                          >
                            <Mail size={14} />
                            {application?.email || "-"}
                          </span>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title="Contact"
                          disableInteractive
                        >
                          <span
                            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                            onClick={() =>
                              window.open(`tel:${application?.phone}`)
                            }
                          >
                            <Phone size={14} />
                            {application?.phone || "No phone"}
                          </span>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Submitted At
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {application?.createdAt
                            ? new Date(application.createdAt).toLocaleString()
                            : "-"}
                        </p>
                      </div>

                      <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Last Updated
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {application?.updatedAt
                            ? new Date(application.updatedAt).toLocaleString()
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main grid */}
                <div className="grid gap-6 xl:grid-cols-3">
                  {/* Left Column */}
                  <div className="xl:col-span-2 space-y-6">
                    {/* Candidate Info */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Candidate Information
                        </h3>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          Applicant
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Full Name
                          </p>
                          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-900">
                            <User size={15} />
                            {application?.fullName || "-"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Email
                          </p>
                          <p className="mt-2 break-all text-sm font-medium text-gray-900 flex">
                            {application?.email || "-"}
                            <Tooltip
                              placement="top"
                              title="Contact"
                              disableInteractive
                            >
                              <Mail
                                size={15}
                                className="ms-2 cursor-pointer text-primary"
                                onClick={() =>
                                  window.open(`mailto:${application?.email}`)
                                }
                              />
                            </Tooltip>
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4 md:col-span-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Phone
                          </p>
                          <p className="mt-2 text-sm font-medium text-gray-900 flex">
                            {application?.phone || "-"}
                            <Tooltip
                              placement="top"
                              title="Contact"
                              disableInteractive
                            >
                              <Phone
                                size={15}
                                className="ms-2 cursor-pointer text-primary"
                                onClick={() =>
                                  window.open(`tel:${application?.phone}`)
                                }
                              />
                            </Tooltip>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Job Info */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Job Information
                        </h3>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Position
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Job Title
                          </p>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            {application?.job?.title?.en ||
                              application?.job?.title?.ar ||
                              "-"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Slug
                          </p>
                          <p className="mt-2 break-all text-sm font-medium text-gray-900">
                            {application?.job?.slug || "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Cover Letter
                        </h3>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          Message
                        </span>
                      </div>

                      <div className="min-h-[180px] whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-800">
                        {application?.coverLetter?.trim()
                          ? application.coverLetter
                          : "No cover letter provided."}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* CV Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          CV / Resume
                        </h3>
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                          Attachment
                        </span>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Uploaded File
                        </p>

                        <p className="mt-2 break-all text-sm font-medium text-gray-900">
                          {application?.cvUrl || "-"}
                        </p>

                        {application?.cvUrl && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <a
                              href={`${docUrl}${application.cvUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-light"
                            >
                              <SquareArrowOutUpRight
                                size={15}
                                className="me-2"
                              />
                              Open
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Metadata
                      </h3>

                      <div className="grid gap-4">
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Application ID
                          </p>
                          <p className="mt-2 break-all text-sm font-medium text-gray-900">
                            {application?._id || "-"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Current Status
                          </p>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            {formatStatus(application?.status)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Panel */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Review
                    </h3>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      Admin
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Status
                      </label>
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
                        <option value="reviewing">Reviewing</option>
                        <option value="rejected">Rejected</option>
                        <option value="accepted">Accepted</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Admin Note
                      </label>
                      <textarea
                        className="textarea w-full"
                        rows={7}
                        value={formData.adminNote}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            adminNote: e.target.value,
                          }))
                        }
                        placeholder="Write internal review notes..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t px-6 py-4 bg-white">
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
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
              📄
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No application data found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              The selected application could not be loaded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
