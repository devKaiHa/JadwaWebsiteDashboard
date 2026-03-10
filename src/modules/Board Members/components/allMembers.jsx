// AllMembers.js
import { Container } from "@/components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";
import UpdateTitleModal from "../../../components/Global/UpdateTitleModal";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Pagination from "../../../components/Global/Pagination";
import PageSizeSelector from "../../../components/Global/PageSizeSelector";
import { Tooltip } from "@mui/material";

import {
  useGetAllMemberQuery,
  useDeleteMemberMutation,
} from "../../../rtk/members/MembersApi";
import { toast, ToastContainer } from "react-toastify";

const AllMembers = () => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading, isError, refetch } = useGetAllMemberQuery({
    page: currentPage,
    limit,
  });

  const [deleteMember, { isLoading: isDeleting, error: deleteError }] =
    useDeleteMemberMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteMember(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      refetch();
      toast.success("Team Member Deleted successfully");
    } catch (err) {
      console.error("Error deleting member:", err);
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
  if (isError) return <ErrorMessageCard onRetry={refetch} />;

  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Members</h3>
          <div className="flex gap-2">
            <AddButton
              label="New Member"
              onClick={() => navigate("/add-member")}
            />
            <AddButton
              label="Update Titles"
              onClick={() => setShowUpdateTitle(true)}
            />
          </div>
        </div>

        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name (EN)</th>
                <th>Position (EN)</th>
                <th>Bio (EN)</th>
                <th>Website</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((member, index) => (
                <tr key={member?._id}>
                  <td>{index + 1 + (currentPage - 1) * limit}</td>
                  <td>{member?.name?.en}</td>
                  <td>{member?.position?.en || member?.position}</td>
                  <td>{member?.bio?.en}</td>

                  <td>
                    <a
                      href={member?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Website
                    </a>
                  </td>
                  <td>
                    {member?.img && (
                      <img
                        src={member?.img}
                        alt={member?.name?.en}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    )}
                  </td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/update-member/${member?._id}`)
                          }
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(member?._id);
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
        title="Delete Member"
        text="Are you sure you want to delete this member? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />

      {/* Update Titles Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="boardMembers"
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AllMembers;
