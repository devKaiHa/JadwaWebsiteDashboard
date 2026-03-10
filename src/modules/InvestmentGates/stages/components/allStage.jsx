import { Container } from "@/components/container";
import { useState } from "react";
import AddButton from "../../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import AllStagesHook from "../hooks/UseAllStage";
import { useNavigate } from "react-router";
import { Tooltip } from "@mui/material";

const StagesList = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  const {
    allData,
    setDeleteId,
    handleDeleteStage,
    isLoading,
    isDeleting,
    isError,
    refetch,
  } = AllStagesHook();
  console.log(`allData`, allData);

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Stages</h3>
          <div className="flex">
            <AddButton
              label="Add Stage"
              onClick={() => navigate("/investment-add-stage")}
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
                <th className="w-[10em]">Steps Count</th>
                <th className="w-[10em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData?.length > 0 ? (
                allData?.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>
                    <td>{item.title?.en}</td>
                    <td>{item.title?.ar}</td>
                    <td>{item.title?.tr}</td>
                    <td>{item.steps?.length || 0}</td>
                    <td>
                      <div className="flex gap-4 cursor-pointer">
                        <Tooltip title="Edit" placement="top">
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/investment-update-stage/${item._id}`)
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
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDeleteStage}
        title="Delete Stage"
        text="Are you sure you want to delete this stage? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
      />

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="gatesStages"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default StagesList;
