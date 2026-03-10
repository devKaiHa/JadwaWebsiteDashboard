import { useState, useEffect } from "react";
import {
  useDeleteOneServiceMutation,
  useGetAllServicesQuery,
} from "../../../../rtk/Service/ServiceApi";
import { toast } from "react-toastify";

const AllServicesHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteService] = useDeleteOneServiceMutation();

  let query = `page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${searchTerm.trim()}`;
  }

  const { data: services, isError, isLoading } = useGetAllServicesQuery(query);

  useEffect(() => {
    if (services) {
      setAllData(services.data || []);
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
        if (result?.status === "true") {
          setDeleteId(null);
        }
        toast.success("Service Deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return {
    allData,
    handleSearch,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: services?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteService,
    isLoading,
    isError,
  };
};

export default AllServicesHook;
