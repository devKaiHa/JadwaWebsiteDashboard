// FundsList.jsx
import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";
import PageSizeSelector from "../../../../components/Global/PageSizeSelector";
import Pagination from "../../../../components/Global/Pagination";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import UseAllFundsHook from "../hooks/useAllFunds";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";

const FundsList = () => {
  const {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages,
    setDeleteId,
    handleDeleteSector,
    isDeleting,
    deleteError,
    isLoading,
    isError,
    refetch,
  } = UseAllFundsHook();

  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    const success = await handleDeleteSector();
    if (success) {
      setShowDelete(false);
      setSelectedId(null);
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="card min-w-full">
        {/* Header */}
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Home Funds</h3>
          <div className="flex gap-2">
            <AddButton
              label="New Fund"
              onClick={() => navigate("/home-add_funds")}
            />
            <AddButton
              label="Update Title"
              onClick={() => setShowUpdateTitle(true)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name (EN)</th>
                <th>Description (EN)</th>
                <th>Investment (EN)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData.length > 0 ? (
                allData.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50">
                    <td>{(currentPage - 1) * limit + index + 1}</td>
                    <td className="truncate max-w-[20em]">
                      {" "}
                      {item?.name?.en || "-"}
                    </td>
                    <td className="truncate max-w-[20em]">
                      {item?.description?.en || "-"}
                    </td>
                    <td className="truncate max-w-[20em]">
                      {item?.investment?.en || "-"}
                    </td>
                    <td>
                      <div className="flex gap-4 cursor-pointer">
                        <Tooltip title="Edit" placement="top">
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/home-update_fund/${item._id}`)
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
                              setSelectedId(item._id);
                              setShowDelete(true);
                            }}
                          >
                            <i className="ki-filled ki-trash-square text-xl" />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No funds available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-footer flex justify-between items-center mt-4">
          <PageSizeSelector perPage={limit} setPerPage={handleLimitChange} />
          <Pagination
            currentPage={currentPage}
            totalPages={pages || 1}
            setCurrentPage={(page) => handlePageChange({ selected: page - 1 })}
          />
        </div>
      </div>

      {/* Delete Modal */}
      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
        title="Delete Fund"
        text="Are you sure you want to delete this fund? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type={"homeFunds"}
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default FundsList;
