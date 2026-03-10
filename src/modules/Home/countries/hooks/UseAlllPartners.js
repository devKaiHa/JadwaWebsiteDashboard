import { useState, useEffect } from "react";
import {
  useDeletePartnerMutation,
  useGetAllPartnersQuery,
} from "../../../rtk/Partners/PartnersApi";

const AllPartnerHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const [deletePartner, { isLoading }] = useDeletePartnerMutation();

  let query = `&page=${currentPage}&limit=${limit}`;
  if (searchTerm.trim() !== "") {
    query += `&keyword=${searchTerm.trim()}`;
  }

  const { data: partners, isError } = useGetAllPartnersQuery(query);
  console.log(partners);
  
  useEffect(() => {
    if (partners) {
      setAllData(partners.data || []);
    }
  }, [partners]);

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

  const handleDeletePartner = async () => {
    try {
      if (deleteId) {
        console.log(deleteId);

        const result = await deletePartner(deleteId).unwrap();
        if (result.status === "true") {
          setDeleteId(null);
        }
      }
    } catch (err) {
      console.error("فشل الحذف:", err);
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
    isError,
  };
};

export default AllPartnerHook;
