import { Container } from "@/components/container";
import {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../../../../rtk/Blog/BlogApi";
import { useNavigate } from "react-router";
import LoadingCard from "../../../../components/Global/LoadingCard";
import AddButton from "../../../../components/Global/AddButton";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";
import Pagination from "../../../../components/Global/Pagination";
import PageSizeSelector from "../../../../components/Global/PageSizeSelector";
import { useState } from "react";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import DeleteModal from "./DleleteModal";

const AllEmployees = () => {
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useGetAllBlogsQuery({
    keyword: query,
    page: currentPage,
    limit: perPage,
  });
  console.log(data);
    const [deleteBlog] = useDeleteBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const handleDelete = () => {
    try {
      deleteBlog(selectedId).unwrap();
      toast.success("Blog Deleted Successfully");
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const handleSwitchPublish = async (id, currentPublished) => {
    try {
      await updateBlog({ id, data: { published: !currentPublished } }).unwrap();
      toast.success(
        `Blog ${!currentPublished ? "published" : "unpublished"} successfully`
      );
    } catch (err) {
      console.log("error", err);
      toast.error("error", "Something went wrong");
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
            <h3 className="card-title">Blogs</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Blog"
                onClick={() => navigate("/blogs/add_blog")}
              />
              <div className="relative">
                <i className="ki-outline ki-magnifier absolute top-1/2 left-2 -translate-y-1/2 text-md text-gray-500"></i>
                <input
                  className="input input-sm pl-8"
                  type="text"
                  placeholder="Search for a blog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={onEnterHit}
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="blogs_table">
                <thead>
                  <tr>
                    <th className="min-w-[200px]">Title</th>
                    <th className="min-w-[150px]">Category</th>
                    <th className="min-w-[200px]">Tags</th>
                    <th className="min-w-[150px]">Status</th>
                    <th className="min-w-[200px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((blog) => (
                    <tr key={blog._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {blog.title?.en ||
                            blog.title?.ar ||
                            blog.title?.tr ||
                            "No Title"}
                        </span>
                      </td>
                      <td>
                        <span className="text-sm text-gray-600">
                          <span className="badge badge-outline">
                            {blog.category?.name?.en ||
                              blog.category?.toString() ||
                              "-"}
                          </span>
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-1 flex-wrap">
                          {blog.tags?.en?.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className="text-sm text-gray-600">
                          {blog?.published ? (
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
                                navigate(`/blogs/update_blog/${blog?._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>
                          <Tooltip title="Publish" placement="top">
                            <button
                              className="cursor-pointer mx-2"
                              onClick={() =>
                                handleSwitchPublish(blog._id, blog.published)
                              }
                            >
                              {blog?.published ? (
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
                                setSelectedId(blog._id);
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
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer flex justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
            <PageSizeSelector perPage={perPage} setPerPage={setPerPage} />
            <Pagination
              currentPage={currentPage}
              totalPages={data?.pagination?.totalPages}
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

export default AllEmployees;
