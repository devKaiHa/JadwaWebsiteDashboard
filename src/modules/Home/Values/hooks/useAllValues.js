import { useState, useEffect } from "react";
import {
  useDeleteValuesMutation,
  useGetAllValuesQuery,
} from "../../../../rtk/Home/values/valuesApi.js";
import { toast } from "react-toastify";

const UseAllValuesHook = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteValue, { isLoading: isDeleting }] = useDeleteValuesMutation();

  let query = `page=${currentPage}&limit=${limit}`;

  const {
    data: values,
    isError,
    isLoading,
    refetch,
  } = useGetAllValuesQuery(query);

  useEffect(() => {
    if (values) setAllData(values.data || []);
  }, [values]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch values data");
    }
  }, [isError]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleDeleteValue = async () => {
    if (!deleteId) return false;

    try {
      const result = await deleteValue(deleteId).unwrap();
      toast.success("Value deleted successfully!");
      if (result?.status === true) {
        setDeleteId(null);
        refetch();
        return true;
      }
    } catch (err) {
      console.error("Failed to delete value:", err);
      toast.error("Failed to delete value. Please try again.");
    }
    return false;
  };

  return {
    allData,
    currentPage,
    handlePageChange,
    limit,
    handleLimitChange,
    pages: values?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteValue,
    isDeleting,
    isLoading,
    isError,
    refetch,
  };
};

export default UseAllValuesHook;
