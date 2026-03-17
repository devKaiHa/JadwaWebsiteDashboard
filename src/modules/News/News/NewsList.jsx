import { Container } from "@/components/container";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useNews, useDeleteNews, useUpdateNews } from "./useNews";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import DeleteModal from "./DeleteModal";
import AddButton from "../../../components/Global/AddButton";
import Pagination from "../../../components/Global/Pagination";
import PageSizeSelector from "../../../components/Global/PageSizeSelector";

const NewsList = () => {
  const navigate = useNavigate();

  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { news, response, isLoading, error } = useNews({
    q: query,
    // page: currentPage,
    // limit: perPage,
  });

  const { handleDeleteNews } = useDeleteNews();
  const { handleUpdateNews } = useUpdateNews();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const handleDelete = async () => {
    try {
      await handleDeleteNews(selectedId);
      toast.success("News deleted successfully");
      setShowDelete(false);
      setSelectedId(null);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleSwitchPublish = async (id, currentPublished) => {
    try {
      await handleUpdateNews({
        id,
        payload: { isPublished: !currentPublished },
      });

      toast.success(
        `News ${!currentPublished ? "published" : "unpublished"} successfully`,
      );
    } catch (err) {
      console.log("error", err);
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
            <h3 className="card-title">News</h3>

            <div className="flex gap-6">
              <AddButton
                label="Add News"
                onClick={() => navigate("/news/add-news")}
              />

              <div className="relative">
                <i className="ki-outline ki-magnifier absolute top-1/2 left-2 -translate-y-1/2 text-md text-gray-500"></i>
                <input
                  className="input input-sm pl-8"
                  type="text"
                  placeholder="Search for news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={onEnterHit}
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="news_table">
                <thead>
                  <tr>
                    <th className="min-w-[200px]">Title</th>
                    <th className="min-w-[150px]">Category</th>
                    <th className="min-w-[150px]">Status</th>
                    <th className="min-w-[200px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {news?.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {item.title?.en ||
                            item.title?.ar ||
                            item.title?.tr ||
                            "No Title"}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-600">
                          <span className="badge badge-outline">
                            {item.category?.name?.en ||
                              item.category?.name?.ar ||
                              item.category?.toString() ||
                              "-"}
                          </span>
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-600">
                          {item?.isPublished ? (
                            <span className="badge badge-outline badge-primary ml-2">
                              Published
                            </span>
                          ) : (
                            <span className="badge badge-outline badge-warning ml-2">
                              Draft
                            </span>
                          )}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() =>
                                navigate(`/news/edit-news/${item?._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Publish" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() =>
                                handleSwitchPublish(item._id, item.isPublished)
                              }
                            >
                              {item?.isPublished ? (
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
                                setSelectedId(item._id);
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

                  {!news?.length && (
                    <tr>
                      <td colSpan={4}>
                        <div className="text-center py-10 text-gray-500">
                          No news found
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

      <ToastContainer />
    </Container>
  );
};

export default NewsList;
