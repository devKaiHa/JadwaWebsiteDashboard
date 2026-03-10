import { useState, useEffect } from "react";
import {
 useDeleteOneInvestServiceMutation,
 useGetAllInvestServiceQuery
} from "../../../../rtk/investmentGates/investServiceApi/investServiceApi";
import { toast } from "react-toastify";

const useAllInvestServicesHook = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteInvestService, { isLoading: isDeleting }] =
    useDeleteOneInvestServiceMutation();

  const query = `page=${currentPage}&limit=${limit}`;

  const {
    data: services,
    isError,
    isLoading,
    refetch,
  } = useGetAllInvestServiceQuery(query);

  // Update local state when data changes
  useEffect(() => {
    if (services) setAllData(services.data || []);
  }, [services]);

  // Show error toast if fetching fails
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch invest services data");
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
  const handleDeleteService = async () => {
    if (!deleteId) return false;

    try {
      const result = await deleteInvestService(deleteId).unwrap();
      toast.success("Invest service deleted successfully!");
      setDeleteId(null);
      refetch();
      return true;
    } catch (err) {
      console.error("Failed to delete invest service:", err);
      toast.error("Failed to delete invest service. Please try again.");
    }
    return false;
  };

  return {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: services?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteService,
    isDeleting,
    isLoading,
    isError,
    refetch,
  };
};

export default useAllInvestServicesHook;
