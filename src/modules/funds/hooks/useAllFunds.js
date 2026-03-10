import { useState, useEffect } from "react";
import {
  useDeleteFundMutation,
  useGetAllFundsQuery,
} from "../../../rtk/funds/FundsPageApi";
import { toast } from "react-toastify";

const UseAllFundsHook = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  // Mutation for delete
  const [deleteFund, { isLoading: isDeleting, error: deleteError }] =
    useDeleteFundMutation();

  // Query params
  let query = `page=${currentPage}&limit=${limit}`;

  // Fetch funds
  const {
    data: funds,
    isError,
    isLoading,
    refetch,
  } = useGetAllFundsQuery(query);

  // Sync API data with local state
  useEffect(() => {
    if (funds) setAllData(funds.data || []);
  }, [funds]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // Handle page size change
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  // Delete fund
  const handleDeleteFund = async () => {
    try {
      if (deleteId) {
        const result = await deleteFund(deleteId).unwrap();
        if (result?.status === true) {
          setDeleteId(null);
          refetch();
          return true;
        }
        toast.success("Fund deleted successfully!");
      }
    } catch (err) {
      console.error("Failed to delete fund:", err);
    }
    return false;
  };

  return {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: funds?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteFund,
    isDeleting,
    deleteError,
    isLoading,
    isError,
    refetch,
  };
};

export default UseAllFundsHook;
