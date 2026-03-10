import { useState, useEffect } from "react";
import {
  useDeleteOneQuestionMutation,
  useGetAllQuestionQuery,
} from "../../../../rtk/Turkish Citzenship/Question/questionApi";
import { toast } from "react-toastify";

const AllQuestionsHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteQuestion, { isLoading: isDeleting }] =
    useDeleteOneQuestionMutation();

  let query = `?page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
  }

  const {
    data: questions,
    isError,
    isLoading,
    refetch,
  } = useGetAllQuestionQuery(query);

  useEffect(() => {
    if (questions?.data) {
      setAllData(questions.data);
    }
  }, [questions]);

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

  const handleDeleteQuestion = async () => {
    try {
      if (deleteId) {
        const result = await deleteQuestion(deleteId).unwrap();
        toast.success("Question Deleted successfully!");

        if (result?.success || result?.status === "true") {
          setDeleteId(null);
          refetch();
        }
      }
    } catch (err) {
      console.error("delete failed", err);
    }
  };

  return {
    allData,
    searchTerm,
    handleSearch,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: questions?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteQuestion,
    isLoading,
    isDeleting,
    isError,
    refetch,
  };
};

export default AllQuestionsHook;
