import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../../components/Global/AddButton";
import {
  useGetAllInvestPartnerQuery,
  useDeleteOneInvestPartnerMutation,
} from "../../../../rtk/investmentGates/partnersApi/partnersApi";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import PageSizeSelector from "../../../../components/Global/PageSizeSelector";
import Pagination from "../../../../components/Global/Pagination";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";

const PartnersList = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isError, isLoading, refetch } = useGetAllInvestPartnerQuery({
    page: currentPage,
    limit: perPage,
  });

  const [deletePartner, { isLoading: isDeleting, error: deleteError }] =
    useDeleteOneInvestPartnerMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deletePartner(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      refetch();
      toast.success("Partner deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Partners List</h3>
          <AddButton
            label="New Partner"
            onClick={() => navigate("/investment-add-partner")}
          />
        </div>

        <div className="card-table">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Logo</th>
                <th>Name (EN)</th>
                <th>Description (EN)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{(currentPage - 1) * perPage + index + 1}</td>

                  <td>
                    <img
                      src={item?.logo || "/default.png"}
                      alt="partner logo"
                      className="w-[10em] h-[5em] object-cover"
                    />
                  </td>
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
                            navigate(`/investment-update-partner/${item._id}`)
                          }
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setShowDelete(true);
                            setSelectedId(item._id);
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
          <PageSizeSelector perPage={perPage} setPerPage={setPerPage} />
          <Pagination
            currentPage={currentPage}
            totalPages={data?.pagination?.totalPages || 1}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
        title="Delete Partner"
        text="Are you sure you want to delete this partner? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default PartnersList;
