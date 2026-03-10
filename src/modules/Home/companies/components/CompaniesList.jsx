import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllHmeCompaniesNameQuery,
  useDeleteCompnayNameMutation,
} from "../../../../rtk/Home/companies/CompanyNameApi";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import PageSizeSelector from "../../../../components/Global/PageSizeSelector";
import Pagination from "../../../../components/Global/Pagination";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";

const CompaniesList = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading, isError, refetch } = useGetAllHmeCompaniesNameQuery({
    page: currentPage,
    limit: perPage,
  });

  const [deleteCompany, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCompnayNameMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteCompany(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      refetch();
      toast.success("Compny Deleted successfully");
    } catch (err) {
      console.error("Error deleting company:", err);
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      {/* جدول أسماء الشركات */}
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Companies Names</h3>
        </div>

        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th className="w-[3em] text-center">#</th>
                <th className="w-[20em]">Name (EN)</th>
                <th className="w-[20em]">Name (AR)</th>
                <th className="w-[20em]">Name (TR)</th>
                <th className="w-[10em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="text-center">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td>{item.name?.en || "-"}</td>
                  <td>{item.name?.ar || "-"}</td>
                  <td>{item.name?.tr || "-"}</td>
                  <td>
                    <div className="flex gap-4 justify-center cursor-pointer">
                      <Tooltip title="Slider" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/home-add_company/${item._id}/${item.name.en}`
                            )
                          }
                        >
                          <i className="ki-filled ki-slider-horizontal-2 text-xl" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {data?.pagination && (
          <div className="card-footer flex justify-between items-center mt-4">
            <PageSizeSelector
              perPage={perPage}
              setPerPage={(newPerPage) => {
                setPerPage(newPerPage);
                setCurrentPage(1);
              }}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={data.pagination.totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
        title="Delete Company"
        text="Are you sure you want to delete this company? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default CompaniesList;
