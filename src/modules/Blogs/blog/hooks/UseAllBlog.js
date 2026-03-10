import { useState, useEffect } from "react";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../../../rtk/Blog/BlogApi";
import { useNavigate } from "react-router";

const AllBlogHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  let query = `&page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${searchTerm.trim()}`;
  }

  const { data: blogs, isError } = useGetAllBlogsQuery(query);

  useEffect(() => {
    if (blogs) {
      setAllData(blogs.data || []);
    }
  }, [blogs]);

  const handleSearch = (word) => {
    setSearchTerm(word);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleDeleteBlogs = async () => {
    try {
      if (deleteId) {
        console.log(deleteId);

        const result = await deleteBlog(deleteId).unwrap();
        if (result.status === "true") {
          setDeleteId(null);
        }
      }
    } catch (err) {
      console.error("فشل الحذف:", err);
    }
  };

  const handleAdd = () => {
    navigate("/blogs/add-blog");
  };

  return {
    allData,
    searchTerm,
    handleSearch,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: blogs?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteBlogs,
    isLoading,
    isError,
    handleAdd,
  };
};

export default AllBlogHook;
