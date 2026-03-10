"use client";

import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";
import PageSizeSelector from "../../../components/Global/PageSizeSelector";
import Pagination from "../../../components/Global/Pagination";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import { ToastContainer } from "react-toastify";
import UseAllFundsHook from "../hooks/useAllFunds";
import { Tooltip } from "@mui/material";

const languages = ["en", "ar", "tr"];

const FundsListPage = () => {
  const navigate = useNavigate();

  const {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages,
    setDeleteId,
    handleDeleteFund,
    isDeleting,
    deleteError,
    isLoading,
    isError,
    refetch,
  } = UseAllFundsHook();

  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    const success = await handleDeleteFund();
    if (success) setShowDelete(false);
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="card min-w-full">
        {/* Header */}
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Investment Funds</h3>
          <div className="flex gap-2">
            <AddButton label="New Fund" onClick={() => navigate("/add-fund")} />
          </div>
        </div>

        {/* Table */}
        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title (EN)</th>
                <th>Subtitle (EN)</th>
                <th>Investment Volume</th>
                <th>Sectors (EN)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((fund, index) => (
                <tr key={fund._id} className="hover:bg-gray-50">
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td className="max-w-xs truncate">{fund.title?.en || "-"}</td>
                  <td className="max-w-xs truncate">
                    {fund.subtitle?.en || "-"}
                  </td>
                  <td className="max-w-xs truncate">
                    {fund.investmentVolume || "-"}
                  </td>
                  <td className="max-w-xs truncate">
                    {fund.sectors?.map((s, i) => (
                      <span key={s._id || i}>
                        {s.en}
                        {i < fund.sectors.length - 1 ? ", " : ""}
                      </span>
                    )) || "-"}
                  </td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => navigate(`/update-fund/${fund._id}`)}
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setDeleteId(fund._id);
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

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default FundsListPage;
