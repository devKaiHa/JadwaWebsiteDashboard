import { Container } from "@/components/container";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import DeleteModal from "../News/DeleteModal";
import AddButton from "../../../components/Global/AddButton";
import Pagination from "../../../components/Global/Pagination";
import PageSizeSelector from "../../../components/Global/PageSizeSelector";
import {
  useNewsCategories,
  useDeleteNewsCategory,
  useUpdateNewsCategory,
} from "./useNewsCategories";
import EditNewsCategoryModal from "./EditNewsCategoryModal";
import AddNewsCategoryModal from "./AddNewsCategoryModal";

const NewsCategoriesList = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { newsCategories, response, isLoading, error } = useNewsCategories({
    q: query,
    // page: currentPage,
    // limit: perPage,
  });

  const { handleDeleteNewsCategory } = useDeleteNewsCategory();
  const { handleUpdateNewsCategory } = useUpdateNewsCategory();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const handleDelete = async () => {
    try {
      await handleDeleteNewsCategory(selectedId);
      toast.success("News category deleted successfully");
      setShowDelete(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await handleUpdateNewsCategory({
        id,
        payload: { isActive: !currentStatus },
      });

      toast.success(
        `Category ${!currentStatus ? "activated" : "deactivated"} successfully`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const onEnterHit = (e) => {
    if (e.key === "Enter") {
      setQuery(searchQuery);
      setCurrentPage(1);
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">News Categories</h3>

            <div className="flex gap-6">
              <AddButton
                label="New Category"
                onClick={() => setShowAddModal(true)}
              />

              <div className="relative">
                <i className="ki-outline ki-magnifier absolute top-1/2 left-2 -translate-y-1/2 text-md text-gray-500"></i>
                <input
                  className="input input-sm pl-8"
                  type="text"
                  placeholder="Search for a category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={onEnterHit}
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table
                className="table table-auto table-border"
                id="news_categories_table"
              >
                <thead>
                  <tr>
                    <th className="min-w-[220px]">Name</th>
                    <th className="min-w-[140px]">Order</th>
                    <th className="min-w-[140px]">Status</th>
                    <th className="min-w-[200px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {newsCategories?.map((category) => (
                    <tr key={category._id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-800">
                            {category.name?.en ||
                              category.name?.ar ||
                              "No Name"}
                          </span>

                          {(category.name?.ar || category.name?.tr) && (
                            <span className="text-xs text-gray-500">
                              {category.name?.ar || category.name?.tr}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700">
                          {category.order ?? 0}
                        </span>
                      </td>

                      <td>
                        {category?.isActive ? (
                          <span className="badge badge-outline badge-primary">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-outline badge-warning">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                setSelectedId(category._id);
                                setShowEditModal(true);
                              }}
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip
                            title={
                              category?.isActive ? "Deactivate" : "Activate"
                            }
                            placement="top"
                          >
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() =>
                                handleToggleStatus(
                                  category._id,
                                  category.isActive,
                                )
                              }
                            >
                              {category?.isActive ? (
                                <i className="ki-duotone ki-cross-circle text-danger text-xl" />
                              ) : (
                                <i className="ki-filled ki-check-squared text-success text-xl" />
                              )}
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                setSelectedId(category._id);
                                setShowDelete(true);
                              }}
                            >
                              <i className="ki-filled ki-trash-square text-xl text-danger" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!newsCategories?.length && (
                    <tr>
                      <td colSpan={4}>
                        <div className="text-center py-10 text-gray-500">
                          No categories found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer flex justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
            <PageSizeSelector perPage={perPage} setPerPage={setPerPage} />
            <Pagination
              currentPage={currentPage}
              totalPages={response?.pagination?.totalPages || 1}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <DeleteModal
        sh={showDelete}
        onClose={setShowDelete}
        Delete={handleDelete}
      />
      <AddNewsCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <EditNewsCategoryModal
        isOpen={showEditModal}
        categoryId={selectedId}
        onClose={() => {
          setShowEditModal(false);
          setSelectedId(null);
        }}
      />

      <ToastContainer />
    </Container>
  );
};

export default NewsCategoriesList;
