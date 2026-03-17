import { useNavigate } from "react-router";
import { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useJobs, useDeleteJob, useUpdateJob, useJobById } from "./useJobs";
import LoadingCard from "../../components/Global/LoadingCard";
import ErrorMessageCard from "../../components/Global/ErrorMessageCard";
import AddButton from "../../components/Global/AddButton";
import DeleteModal from "../News/News/DeleteModal";
import GlobalModal from "../../components/Global/GlobalModal";
import { ViewJob } from "./ViewJob";

const JobsList = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState(null);

  const [confirmMsg, setConfirmMsg] = useState(null);

  const { jobs, isLoading, error, refetch } = useJobs({
    q: query,
    status,
  });

  const { handleDeleteJob } = useDeleteJob();
  const { handleUpdateJob } = useUpdateJob();
  const { job, isLoading: isLoadingOne } = useJobById(viewId);

  if (isLoading) return <LoadingCard />;
  if (error)
    return (
      <ErrorMessageCard
        message={error?.data?.message ?? "Something went wrong"}
        onRetry={() => {
          if (error?.data?.message === "Not authorized, no token provided") {
            navigate("/auth/login");
          } else {
            window.location.reload();
          }
        }}
        btnTxt="Login"
      />
    );

  const onEnterHit = (e) => {
    if (e.key === "Enter") {
      setQuery(searchQuery);
    }
  };

  const handleDelete = async () => {
    if (selectedJob?.slug !== confirmMsg) {
      toast.error("Please double-check the confirmation message");
      return;
    }
    try {
      await handleDeleteJob(selectedJob?._id);
      toast.success("Job deleted successfully");
      setShowDelete(false);
      setSelectedJob(null);
      setConfirmMsg(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleStatus = async (job) => {
    try {
      await handleUpdateJob({
        id: job?._id,
        payload: {
          status: job?.status === "published" ? "closed" : "published",
        },
      });

      toast.success(
        `Job ${!job.status === "published" ? "published" : "closed"} successfully`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update publish status");
    }
  };

  const formatEmploymentType = (type) => {
    switch (type) {
      case "full_time":
        return "Full Time";
      case "part_time":
        return "Part Time";
      case "contract":
        return "Contract";
      case "internship":
        return "Internship";
      default:
        return type || "-";
    }
  };

  const viewJob = (jobId, isOpen) => {
    setOpenView(isOpen);
    if (jobId) setViewId(jobId);
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap gap-4">
            <h3 className="card-title">Jobs List</h3>

            <div className="space-y-2">
              <div className="flex gap-2">
                <AddButton
                  label="New Job"
                  onClick={() => navigate("/jobs/add-job")}
                />

                <button
                  type="button"
                  className="btn btn-sm btn-outline btn-primary h-8 flex items-center gap-2 capitalize"
                  onClick={refetch}
                  disabled={isLoading}
                >
                  <i className="ki-outline ki-arrows-circle"></i>
                  {isLoading ? "Refreshing..." : "Refresh"}
                </button>

                <div className="relative">
                  <i className="ki-outline ki-magnifier absolute top-1/2 left-2 -translate-y-1/2 text-md text-gray-500"></i>
                  <input
                    className="input input-sm pl-8"
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={onEnterHit}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  className="select select-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[220px]">Title</th>
                    <th className="min-w-[160px]">Employment Type</th>
                    <th className="min-w-[160px]">Location</th>
                    <th className="min-w-[120px]">Status</th>
                    <th className="min-w-[120px]">Close Date</th>
                    <th className="min-w-[220px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs?.map((job) => (
                    <tr key={job?._id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-800">
                            {job?.title?.en || job?.title?.ar || "No Title"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {job?.slug || "-"}
                          </span>
                        </div>
                      </td>

                      <td>{formatEmploymentType(job?.employmentType)}</td>
                      <td>{job?.location || "-"}</td>

                      <td>
                        <span className="badge badge-outline">
                          {job?.status}
                        </span>
                      </td>

                      <td>
                        {job?.closeDate?.split("T")[0] ?? "Not specified"}
                      </td>

                      <td>
                        <div className="flex gap-1">
                          <Tooltip
                            disableInteractive
                            title="View"
                            placement="top"
                          >
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => viewJob(job?._id, true)}
                            >
                              <i className="ki-filled ki-eye text-xl" />
                            </button>
                          </Tooltip>
                          <Tooltip
                            disableInteractive
                            title="Edit"
                            placement="top"
                          >
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() =>
                                navigate(`/jobs/edit-job/${job?._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip
                            disableInteractive
                            title={
                              job?.status === "published"
                                ? "Close job"
                                : "Publish job"
                            }
                            placement="top"
                          >
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => handleStatus(job)}
                            >
                              {job?.status === "published" ? (
                                <i className="ki-duotone ki-cross-circle text-xl text-danger" />
                              ) : (
                                <i className="ki-duotone ki-check-circle text-xl text-success" />
                              )}
                            </button>
                          </Tooltip>

                          <Tooltip
                            disableInteractive
                            title="Delete"
                            placement="top"
                          >
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                setSelectedJob(job);
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

                  {!jobs?.length && (
                    <tr>
                      <td colSpan={7}>
                        <div className="text-center py-10 text-gray-500">
                          No jobs found
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

      <GlobalModal
        isOpen={openView}
        onClose={() => viewJob(null, false)}
        title="View Job Details"
        cancelText="Close"
        isLoading={isLoadingOne}
        width="w-[60em]"
      >
        {isLoadingOne ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <LoadingCard />
          </div>
        ) : job ? (
          <ViewJob job={job} />
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
              📄
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No job data found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              The selected job could not be loaded.
            </p>
          </div>
        )}
      </GlobalModal>

      <DeleteModal
        sh={showDelete}
        onClose={setShowDelete}
        Delete={handleDelete}
        title={"Delete this job?"}
        content={
          <div>
            <h3>
              Enter <b>{selectedJob?.slug}</b> to confirm deletion
            </h3>
            <input
              className="input"
              placeholder={selectedJob?.slug}
              type="text"
              value={confirmMsg}
              onChange={(e) => setConfirmMsg(e.target.value)}
            />
          </div>
        }
        disableBtn={selectedJob?.slug !== confirmMsg}
      />

      <ToastContainer />
    </Container>
  );
};

export default JobsList;
