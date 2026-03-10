import { useState, useEffect } from "react";
import {
  useDeleteOneAdvantageMutation,
  useGetAllAdvantageQuery,
} from "../../../../rtk/Turkish Citzenship/Advantage/advantageApi";
import { toast } from "react-toastify";

const AllAdvantagesHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteAdvantage, { isLoading: isDeleting }] =
    useDeleteOneAdvantageMutation();

  let query = `?page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
  }

  const {
    data: advantages,
    isError,
    isLoading,
    refetch,
  } = useGetAllAdvantageQuery(query);

  useEffect(() => {
    if (advantages?.data) {
      setAllData(advantages.data);
    }
  }, [advantages]);

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

  const handleDeleteAdvantage = async () => {
    try {
      if (deleteId) {
        const result = await deleteAdvantage(deleteId).unwrap();
        toast.success("Advantage Deleted successfully!");

        if (result?.success || result?.status === "true") {
          setDeleteId(null);
          refetch();
        }
      }
    } catch (err) {
      console.error("فشل حذف الميزة:", err);
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
    pages: advantages?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteAdvantage,
    isLoading,
    isDeleting,
    isError,
    refetch,
  };
};

export default AllAdvantagesHook;
