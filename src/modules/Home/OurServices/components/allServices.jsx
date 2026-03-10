// AllServices.jsx
import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllServicesHook from "../hooks/UseAllServices";
import AddButton from "../../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import PageSizeSelector from "../../../../components/Global/PageSizeSelector";
import Pagination from "../../../../components/Global/Pagination";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";

const AllServices = () => {
  const navigate = useNavigate();

  const {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages,
    setDeleteId,
    handleDeleteService,
    isDeleting,
    deleteError,
    isLoading,
    isError,
    refetch,
  } = AllServicesHook();

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdateService, setShowUpdateService] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    const success = await handleDeleteService();
    if (success) {
      setShowDelete(false);
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Services</h3>
          <div className="flex gap-2">
            <AddButton
              label="New Service"
              onClick={() => navigate("/add_service")}
            />
            <AddButton
              label="Update Titles"
              onClick={() => setShowUpdateTitle(true)}
            />
          </div>
        </div>

        <div className="card-table">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name (EN)</th>
                <th>Description (EN)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {allData?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td className="max-w-xs truncate">{item?.name?.en || "-"}</td>
                  <td className="max-w-xs truncate">
                    {item?.description?.en || "-"}
                  </td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/home-update_service/${item._id}`)
                          }
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowDelete(true);
                          }}
                        >
                          <i className="ki-filled ki-trash-square text-xl" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="card-footer flex justify-between items-center mt-4">
          <PageSizeSelector perPage={limit} setPerPage={handleLimitChange} />
          <Pagination
            currentPage={currentPage}
            totalPages={pages || 1}
            setCurrentPage={(page) => handlePageChange({ selected: page - 1 })}
          />
        </div>
      </div>

      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
        title="Delete Service"
        text="Are you sure you want to delete this service? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />

      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="homeServices"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AllServices;
