import { useState, useEffect } from "react";
import {
  useDeleteOneServiceTMutation,
  useGetAllServiceTQuery,
} from "../../../../rtk/Turkish Citzenship/Service/serviceApi";
import { toast } from "react-toastify";

const AllServicesHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteService, { isLoading: isDeleting }] =
    useDeleteOneServiceTMutation();

  let query = `?page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
  }

  const {
    data: services,
    isError,
    isLoading,
    refetch,
  } = useGetAllServiceTQuery(query);

  useEffect(() => {
    if (services?.data) {
      setAllData(services.data);
    }
  }, [services]);

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

  const handleDeleteService = async () => {
    try {
      if (deleteId) {
        const result = await deleteService(deleteId).unwrap();
        toast.success("Service Deleted successfully!");

        if (result?.success || result?.status === "true") {
          setDeleteId(null);
          refetch();
        }
      }
    } catch (err) {
      console.error("Delete service failed:", err);
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
    pages: services?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteService,
    isLoading,
    isDeleting,
    isError,
    refetch,
  };
};

export default AllServicesHook;
