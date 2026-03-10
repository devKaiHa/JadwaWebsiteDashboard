// UseAllFundsHook.js
import { useState, useEffect } from "react";
import {
  useGetAllFundsQuery,
  useDeleteFundsMutation,
} from "../../../../rtk/Home/funds/FundsApi";
import { toast } from "react-toastify";

const UseAllFundsHook = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteSector, { isLoading: isDeleting, error: deleteError }] =
    useDeleteFundsMutation();

  const query = `page=${currentPage}&limit=${limit}`;

  const {
    data: funds,
    isError,
    isLoading,
    refetch,
  } = useGetAllFundsQuery(query);

  useEffect(() => {
    if (funds) setAllData(funds.data || []);
  }, [funds]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleDeleteSector = async () => {
    try {
      if (deleteId) {
        const result = await deleteSector(deleteId).unwrap();
        if (result?.status === true) {
          setDeleteId(null);
          refetch();
          return true;
        }
        toast.success("Fund Deleted successfully!");
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
    pages: funds?.pagination?.totalPages,
    setDeleteId,
    handleDeleteSector,
    isDeleting,
    deleteError,
    isLoading,
    isError,
    refetch,
  };
};

export default UseAllFundsHook;
