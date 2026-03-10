import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Pagination from "../../../components/Global/Pagination";
import PageSizeSelector from "../../../components/Global/PageSizeSelector";
import { Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import {
  useDeletePortfolioMutation,
  useGetAllPortfoliosQuery,
} from "../../../rtk/InvestPortfolio/InvestPortfolioApi";

const ListInvestPortfolio = () => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading, error, refetch } = useGetAllPortfoliosQuery({
    page: currentPage,
    limit,
  });
  console.log(error);

  const [deletePortfolio, { isLoading: isDeleting, error: deleteError }] =
    useDeletePortfolioMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deletePortfolio(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      refetch();
      toast.success("Investment Portfolio Deleted Successfully");
    } catch (err) {
      toast.error("Investment Portfolio Delete Error");
      console.error("Error Deleting Investment Portfolio:", err);
    }
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard onRetry={refetch} />;

  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Investment Portfolios</h3>
          <div className="flex gap-2">
            <AddButton
              label="New Portfolio"
              onClick={() => navigate("/add-invest-portfolio")}
            />
          </div>
        </div>

        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name (EN)</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((portfolio, index) => (
                <tr key={portfolio?._id}>
                  <td>{index + 1 + (currentPage - 1) * limit}</td>
                  <td>{portfolio?.name?.en}</td>
                  <td>
                    {portfolio?.img && (
                      <img
                        src={portfolio?.img}
                        alt={portfolio?.name?.en}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                  </td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/update-invest-portfolio/${portfolio?._id}`
                            )
                          }
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(portfolio?._id);
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
            totalPages={totalPages}
            setCurrentPage={(page) => handlePageChange({ selected: page - 1 })}
          />
        </div>
      </div>

      {/* Delete Modal */}
      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
        title="Delete Investment Portfolio"
        text="Are you sure you want to delete this investment portfolio? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default ListInvestPortfolio;
