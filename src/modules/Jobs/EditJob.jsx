import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingCard from "../../components/Global/LoadingCard";
import ErrorMessageCard from "../../components/Global/ErrorMessageCard";
import { useJobById, useUpdateJob } from "./useJobs";
import JobForm from "./JobForm";
import { Container } from "@mui/material";

const emptyML = () => ({ en: "", ar: "" });

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { job, isLoading: isFetching, error } = useJobById(id);
  const { handleUpdateJob, isLoading: isUpdating } = useUpdateJob();

  const [formData, setFormData] = useState({
    title: emptyML(),
    description: emptyML(),
    location: "",
    employmentType: "full_time",
    status: "draft",
    closeDate: "",
  });

  useEffect(() => {
    if (!job) return;

    setFormData({
      title: {
        en: job?.title?.en || "",
        ar: job?.title?.ar || "",
      },
      description: {
        en: job?.description?.en || "",
        ar: job?.description?.ar || "",
      },
      location: job?.location || "",
      employmentType: job?.employmentType || "full_time",
      status: job?.status ?? "draft",
      closeDate: job?.closeDate ? job.closeDate.split("T")[0] : "",
    });
  }, [job]);

  if (isFetching) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleUpdateJob({ id, payload: formData });
      toast.success("Job updated successfully");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5">
            <h3 className="card-title">Edit Job</h3>
          </div>

          <JobForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
            onCancel={() => navigate("/jobs")}
          />
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default EditJob;
