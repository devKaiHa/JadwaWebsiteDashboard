import { useState, useEffect } from "react";
import {
  useDeleteOneInvestMutation,
  useGetAllInvestQuery,
} from "../../../../rtk/Turkish Citzenship/investOptions/investApi";
import { toast } from "react-toastify";

const AllInvesthook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteInvest, { isLoading: isDeleting }] =
    useDeleteOneInvestMutation();

  let query = `?page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
  }

  const {
    data: invests,
    isError,
    isLoading,
    refetch,
  } = useGetAllInvestQuery(query);

  useEffect(() => {
    if (invests?.data) {
      setAllData(invests.data);
    }
  }, [invests]);

  // ✅ البحث
  const handleSearch = (word) => {
    setSearchTerm(word);
    setCurrentPage(1);
  };

  // ✅ تغيير الصفحة
  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ✅ تغيير عدد العناصر
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  // ✅ الحذف
  const handleDeleteInvest = async () => {
    try {
      if (deleteId) {
        const result = await deleteInvest(deleteId).unwrap();
        toast.success("Invest Item Deleted successfully!");

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
    pages: invests?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteInvest,
    isLoading,
    isDeleting,
    isError,
    refetch,
  };
};

export default AllInvesthook;
