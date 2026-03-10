import { Container } from "@/components/container";
import { useState } from "react";
import AddButton from "../../../../components/Global/AddButton.jsx";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal.jsx";
import UpdateServiceModal from "./updateModal.jsx";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal.jsx";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard.jsx";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard.jsx";
import AllServiceHook from "../hooks/UseAllService.js";
import { useNavigate } from "react-router";
import { Tooltip } from "@mui/material";

const ServiceList = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {
    allData,
    setDeleteId,
    handleDeleteService,
    isLoading,
    isDeleting,
    isError,
    refetch,
  } = AllServiceHook();

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Comperhensive Services</h3>
          <div className="flex">
            <AddButton
              label="Add Service"
              onClick={() => navigate("/turkish-add-service")}
            />
            <div className="ml-2">
              <AddButton
                label="Update Title"
                onClick={() => setShowUpdateTitle(true)}
              />
            </div>
          </div>
        </div>

        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th className="w-[3em]">#</th>
                <th className="w-[20em]">Title (EN)</th>
                <th className="w-[20em]">Title (AR)</th>
                <th className="w-[20em]">Title (TR)</th>
                <th className="w-[30em]">Short Description (EN)</th>
                <th className="w-[10em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{item.title?.en}</td>
                  <td>{item.title?.ar}</td>
                  <td>{item.title?.tr}</td>
                  <td>{item.shortDescriptopn?.en}</td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/turkish-update-service/${item._id}`)
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
                            setDeleteId(item._id);
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
      </div>

      {/* Delete Modal */}
      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDeleteService}
        title="Delete Service"
        text="Are you sure you want to delete this Service? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
      />

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="citizenshipComperhensive"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default ServiceList;
