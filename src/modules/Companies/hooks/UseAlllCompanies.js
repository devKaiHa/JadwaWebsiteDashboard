import { useState, useEffect } from "react";
import {
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
} from "../../../rtk/Companies/CompaniesApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AllCompaniesHook = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [deleteCompany, { isLoading, error }] = useDeleteCompanyMutation();

  const query = `page=${currentPage}&limit=${perPage}${searchQuery ? `&keyword=${searchQuery}` : ""}`;

  const {
    data: companies,
    isLoading: isGetLoading,
    isError: isGetError,
  } = useGetAllCompaniesQuery(query);

  useEffect(() => {
    if (companies) {
      setAllData(companies.data || []);
    }
  }, [companies]);

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

  const handleDeleteCompany = async () => {
    try {
      if (deleteId) {
        const result = await deleteCompany(deleteId).unwrap();
        toast.success("Company Deleted successfully!");

        if (result.status === "true") {
          setDeleteId(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleAdd = () => {
    navigate("/companies/add-company");
  };

  return {
    allData,
    searchTerm,
    handleSearch,
    totalPages: companies?.pagination?.totalPages || 1,
    setDeleteId,
    handleDeleteCompany,
    isLoading: isLoading || isGetLoading,
    isError: isGetError || error,
    handleAdd,
    setPerPage,
    perPage,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    navigate,
  };
};

export default AllCompaniesHook;
