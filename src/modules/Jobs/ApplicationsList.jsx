import { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import LoadingCard from "../../components/Global/LoadingCard";
import ErrorMessageCard from "../../components/Global/ErrorMessageCard";
import DeleteModal from "../News/News/DeleteModal";
import {
  useJobApplications,
  useDeleteJobApplication,
} from "./useJobApplications";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import SearchableSelect from "../../components/Global/SearchableSelect";
import { useJobs } from "./useJobs";
import { useNavigate } from "react-router";

const ApplicationsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [job, setJob] = useState("");
  const [jobsQuery, setJobsQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    jobs,
    isLoading: loadingJobs,
    error: jobsError,
  } = useJobs({
    q: jobsQuery,
  });
  const { applications, isLoading, error, refetch } = useJobApplications({
    q: query,
    status,
    job,
  });

  const { handleDeleteJobApplication } = useDeleteJobApplication();

  if (isLoading) return <LoadingCard />;
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
  />;

  const onEnterHit = (e) => {
    if (e.key === "Enter") {
      setQuery(searchQuery);
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeleteJobApplication(selectedId);
      toast.success("Application deleted successfully");
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
            <h3 className="card-title">Job Applications</h3>

            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary h-8 flex items-center gap-2 capitalize"
                    onClick={refetch}
                    disabled={isLoading}
                  >
                    <i className="ki-outline ki-arrows-circle"></i>
                    {isLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
                <div className="relative">
                  <i className="ki-outline ki-magnifier absolute top-1/2 left-2 -translate-y-1/2 text-md text-gray-500"></i>
                  <input
                    className="input input-sm pl-8"
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={onEnterHit}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <select
                  className="select select-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
                <SearchableSelect
                  height="2"
                  label="Jobs"
                  placeholder={
                    loadingJobs ? "Loading jobs..." : "Select a job..."
                  }
                  options={{ data: jobs || [] }}
                  selectedValue={job}
                  disabled={loadingJobs || !!jobsError}
                  getOptionLabel={(opt) =>
                    opt?.title?.en || opt?.title?.ar || "—"
                  }
                  onInputChange={(value) => {
                    setJobsQuery(value);
                    if (!value.trim()) setJob("");
                  }}
                  onChange={(option) => {
                    setJob(option?._id || "");
                  }}
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Job</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {applications?.map((item) => (
                    <tr key={item?._id}>
                      <td>{item?.fullName || "-"}</td>
                      <td>
                        {item?.job?.title?.en || item?.job?.title?.ar || "-"}
                      </td>
                      <td>{item?.email || "-"}</td>
                      <td>{item?.phone || "-"}</td>
                      <td>{item?.status || "-"}</td>
                      <td>
                        {item?.createdAt
                          ? new Date(item?.createdAt).toLocaleString()
                          : "-"}
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

                  {!applications?.length && (
                    <tr>
                      <td colSpan={7}>
                        <div className="text-center py-10 text-gray-500">
                          No applications found
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

      <ApplicationDetailsModal
        isOpen={showDetails}
        applicationId={selectedId}
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

export default ApplicationsList;
