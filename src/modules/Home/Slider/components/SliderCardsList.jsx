import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../../components/Global/AddButton";
import {
  useGetAllHmeSlidersQuery,
  useDeletehomeSliderMutation,
} from "../../../../rtk/Home/Slider/HomeSliderApi";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import PageSizeSelector from "../../../../components/Global/PageSizeSelector";
import Pagination from "../../../../components/Global/Pagination";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";

const SliderCardsList = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isError, isLoading, refetch } = useGetAllHmeSlidersQuery({
    page: currentPage,
    limit: perPage,
  });

  const [deleteHomeSlider, { isLoading: isDeleting, error: deleteError }] =
    useDeletehomeSliderMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteHomeSlider(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      refetch();
      toast.success("Slider Deleted successfully");
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
          <h3 className="card-title">Slider Cards</h3>
          <AddButton
            label="New Card"
            onClick={() => navigate("/home-add-slider-list")}
          />
        </div>

        <div className="card-table">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title (EN)</th>
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
                      src={item?.img || "/default.png"}
                      alt="slider"
                      className="w-[10em] h-[5em] object-cover"
                    />
                  </td>
                  <td className="max-w-xs truncate">
                    {item?.title?.en || "-"}
                  </td>
                  <td className="max-w-xs truncate">
                    {item?.description?.en || "-"}
                  </td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/home-update-slider-list/${item._id}`)
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
        title="Delete Slider"
        text="Are you sure you want to delete this slider? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default SliderCardsList;
