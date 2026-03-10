import { useState, useEffect } from "react";
import {
  useDeleteSectorMutation,
  useGetAllHomeSectorsQuery,
} from "../../../../rtk/Home/sectors/HomeSectorsApi";
import { toast } from "react-toastify";

const UseAllSectorsHook = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteSector, { isLoading: isDeleting }] = useDeleteSectorMutation();

  let query = `page=${currentPage}&limit=${limit}`;

  const { data: sectors, isError, isLoading, refetch } =
    useGetAllHomeSectorsQuery(query);

  useEffect(() => {
    if (sectors) setAllData(sectors.data || []);
  }, [sectors]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch sectors data");
    }
  }, [isError]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleDeleteSector = async () => {
    if (!deleteId) return false;

    try {
      const result = await deleteSector(deleteId).unwrap();

      if (result?.status === true) {
        toast.success("Sector deleted successfully!");
        setDeleteId(null);
        refetch();
        return true;
      } else {
        toast.error("Failed to delete sector. Please try again.");
      }
    } catch (err) {
      console.error("Failed to delete sector:", err);
      toast.error("Failed to delete sector. Please try again.");
    }
    return false;
  };

  return {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: sectors?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteSector,
    isDeleting,
    isLoading,
    isError,
    refetch,
  };
};

export default UseAllSectorsHook;
