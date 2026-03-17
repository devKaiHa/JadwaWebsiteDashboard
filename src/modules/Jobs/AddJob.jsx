import { useNavigate } from "react-router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useCreateJob } from "./useJobs";
import JobForm from "./JobForm";
import { Container } from "@mui/material";

const emptyML = () => ({ en: "", ar: "" });

const AddJob = () => {
  const navigate = useNavigate();
  const { handleCreateJob, isLoading } = useCreateJob();

  const [formData, setFormData] = useState({
    title: emptyML(),
    description: emptyML(),
    location: "",
    employmentType: "full_time",
    status: "draft",
    closeDate: "",
  });

  const validateForm = () => {
    if (!formData?.title?.en?.trim() || !formData?.title?.ar?.trim()) {
      return "Title must be filled in both English and Arabic";
    }

    if (
      !formData?.description?.en?.trim() ||
      !formData?.description?.ar?.trim()
    ) {
      return "Descriptions must be filled in both English and Arabic";
    }

    if (!formData?.location?.trim()) {
      return "Location is required";
    }

    if (!formData?.employmentType) {
      return "Employment type is required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errMsg = validateForm();

    if (errMsg) {
      toast.error(errMsg);
      return;
    }

    try {
      await handleCreateJob(formData);
      toast.success("Job created successfully");
      navigate("/jobs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create job");
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5">
            <h3 className="card-title">Add Job</h3>
          </div>

          <JobForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={() => navigate("/jobs")}
          />
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default AddJob;
