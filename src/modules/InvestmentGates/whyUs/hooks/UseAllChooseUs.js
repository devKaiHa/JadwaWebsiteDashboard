import { useState, useEffect } from "react";
import {
  useDeleteOneChooseusMutation,
  useGetAllChooseusQuery,
} from "../../../../rtk/investmentGates/chooseUsApi/chooseUsApi"; // Adjust path
import { toast } from "react-toastify";

const useAllChooseUsHook = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteChooseUs, { isLoading: isDeleting }] =
    useDeleteOneChooseusMutation();

  const query = `page=${currentPage}&limit=${limit}`;

  const {
    data: chooseUsList,
    isError,
    isLoading,
    refetch,
  } = useGetAllChooseusQuery(query);

  // Update local state when data changes
  useEffect(() => {
    if (chooseUsList) setAllData(chooseUsList.data || []);
  }, [chooseUsList]);

  // Show error toast if fetching fails
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch Choose Us data");
    }
  }, [isError]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  // Handle delete
  const handleDeleteChooseUs = async () => {
    if (!deleteId) return false;

    try {
      await deleteChooseUs(deleteId).unwrap();
      toast.success("Choose Us entry deleted successfully!");
      setDeleteId(null);
      refetch();
      return true;
    } catch (err) {
      console.error("Failed to delete Choose Us entry:", err);
      toast.error("Failed to delete entry. Please try again.");
    }
    return false;
  };

  return {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: chooseUsList?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteChooseUs,
    isDeleting,
    isLoading,
    isError,
    refetch,
  };
};

export default useAllChooseUsHook;
