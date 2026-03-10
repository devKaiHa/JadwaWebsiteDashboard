import { useState } from "react";
import { Container } from "@/components/container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import CompanyCard from "./CompanyCard";
import { useCompanyDetails } from "../hooks/useCompanyDetails";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";

const ManageCompanySlider = () => {
  const {
    companies,
    isFetching,
    isGetError,
    handleNameChange,
    handleSlideChange,
    handleFileSelect,
    removeImage,
    removeSlideById,
    removeCompanyByIndex,
    addSlide,
    saveCompanyDetail,
  } = useCompanyDetails();

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'slide' | 'company', companyIndex, slideIndex }

  const handleDeleteClick = (type, companyIndex, slideIndex = null) => {
    setDeleteTarget({ type, companyIndex, slideIndex });
    setShowDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    const { type, companyIndex, slideIndex } = deleteTarget;

    if (type === "slide") {
      await removeSlideById(companyIndex, slideIndex);
    } else if (type === "company") {
      await removeCompanyByIndex(companyIndex);
    }

    setShowDelete(false);
    setDeleteTarget(null);
  };

  if (isFetching) return <LoadingCard />;
  if (isGetError) return <ErrorMessageCard onRetry={() => {}} />;

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Manage Company Slides</h1>
      </div>

      <div className="flex flex-col gap-10">
        {companies.map((company, companyIndex) => (
          <CompanyCard
            key={company._id || companyIndex}
            company={company}
            companyIndex={companyIndex}
            handleNameChange={handleNameChange}
            handleSlideChange={handleSlideChange}
            handleFileSelect={handleFileSelect}
            removeImage={removeImage}
            addSlide={addSlide}
            saveCompanyDetail={saveCompanyDetail}
            onRemoveSlide={(slideIndex) =>
              handleDeleteClick("slide", companyIndex, slideIndex)
            }
            onRemoveCompany={() => handleDeleteClick("company", companyIndex)}
          />
        ))}
      </div>

      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleConfirmDelete}
        title="Confirm Delete"
        text="Are you sure you want to delete this item? This action cannot be undone."
        butText="Delete"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default ManageCompanySlider;
