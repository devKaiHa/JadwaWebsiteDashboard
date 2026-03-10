import { useState, useEffect } from "react";
import {
  useDeleteOneStagesMutation,
  useGetAllStagesQuery,
} from "../../../../rtk/investmentGates/stagesApi/stagesApi";
import { toast } from "react-toastify";

const AllStagesHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteStage, { isLoading: isDeleting }] = useDeleteOneStagesMutation();

  let query = `?page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
  }

  const {
    data: stages,
    isError,
    isLoading,
    refetch,
  } = useGetAllStagesQuery(query);

  useEffect(() => {
    if (stages?.data) {
      setAllData(stages.data);
    }
  }, [stages]);

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

  // الحذف
  const handleDeleteStage = async () => {
    try {
      if (deleteId) {
        const result = await deleteStage(deleteId).unwrap();
        toast.success("Stage Deleted successfully");

        if (result?.success || result?.status === "true") {
          setDeleteId(null);
          refetch(); 
        }
      }
    } catch (err) {
      console.error("فشل حذف الـ Stage:", err);
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
    pages: stages?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteStage,
    isLoading,
    isDeleting,
    isError,
    refetch,
  };
};

export default AllStagesHook;
