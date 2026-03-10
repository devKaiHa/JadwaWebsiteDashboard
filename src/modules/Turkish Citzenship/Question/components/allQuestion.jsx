import { Container } from "@/components/container";
import { useState } from "react";
import AddButton from "../../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import AllQuestionsHook from "../hooks/UseAllQuestion.js";
import { useNavigate } from "react-router";
import { Tooltip } from "@mui/material";

const QuestionList = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {
    allData,
    setDeleteId,
    handleDeleteQuestion,
    isLoading,
    isDeleting,
    isError,
    refetch,
  } = AllQuestionsHook();

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Turkish Citizenship FAQs</h3>
          <div className="flex">
            <AddButton
              label="Add Question"
              onClick={() => navigate("/turkish-add-questions")}
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
                <th className="w-[15em]">Question (EN)</th>
                <th className="w-[15em]">Question (AR)</th>
                <th className="w-[15em]">Question (TR)</th>
                <th className="w-[20em]">Answer (EN)</th>
                <th className="w-[10em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.questions?.en}</td>
                  <td>{item.questions?.ar}</td>
                  <td>{item.questions?.tr}</td>
                  <td>{item.answers?.en}</td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/turkish-update-questions/${item._id}`)
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
        onDelete={handleDeleteQuestion}
        title="Delete Question"
        text="Are you sure you want to delete this Question? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
      />

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="citizenshipFaq"
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default QuestionList;
