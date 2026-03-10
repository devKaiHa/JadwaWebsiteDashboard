import { useState, useEffect } from "react";
import {
  useDeleteOneInvestPartnerMutation,
  useGetAllInvestPartnerQuery,
} from "../../../../rtk/investmentGates/partnersApi/partnersApi"; 

const AllPartnersHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deletePartner, { isLoading: isDeleting }] =
    useDeleteOneInvestPartnerMutation();

  let query = `?page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
  }

  const {
    data: partners,
    isError,
    isLoading,
    refetch,
  } = useGetAllInvestPartnerQuery(query);

  useEffect(() => {
    if (partners?.data) {
      setAllData(partners.data);
    }
  }, [partners]);

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
  const handleDeletePartner = async () => {
    try {
      if (deleteId) {
        const result = await deletePartner(deleteId).unwrap();
        if (result?.success || result?.status === "true") {
          setDeleteId(null);
          refetch(); // تحديث القائمة بعد الحذف
        }
      }
    } catch (err) {
      console.error("فشل حذف الشريك:", err);
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
    pages: partners?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeletePartner,
    isLoading,
    isDeleting,
    isError,
    refetch,
  };
};

export default AllPartnersHook;
