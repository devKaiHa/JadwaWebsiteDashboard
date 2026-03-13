import {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "../../../rtk/Companies/CompaniesApi";

export const useCompanies = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetCompaniesQuery(filters);

  return {
    companies: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCompanyById = (id) => {
  const { data, isLoading, error, refetch } = useGetCompanyByIdQuery(id, {
    skip: !id,
  });

  return {
    company: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateCompany = () => {
  /*
  Payload: {
  project: "67ce1234abcd5678ef901234",
  sector: "67ce9999abcd5678ef909999",
  name: {
    ar: "شركة جدوى التقنية",
    en: "Jadwa Tech Company",
  },
  description: {
    ar: "وصف الشركة",
    en: "Company description",
  },
  slug: "jadwa-tech-company",
  image: "",
  ownershipPercentage: 40,
  status: "active",
  isPublished: true,
  order: 0,
}
  */
  const [createCompany, { isLoading, error, data }] =
    useCreateCompanyMutation();

  const handleCreateCompany = async (payload) => {
    return await createCompany(payload).unwrap();
  };

  return {
    handleCreateCompany,
    isLoading,
    error,
    data,
  };
};

export const useUpdateCompany = () => {
  const [updateCompany, { isLoading, error, data }] =
    useUpdateCompanyMutation();

  const handleUpdateCompany = async ({ id, payload }) => {
    return await updateCompany({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateCompany,
    isLoading,
    error,
    data,
  };
};

export const useDeleteCompany = () => {
  const [deleteCompany, { isLoading, error, data }] =
    useDeleteCompanyMutation();

  const handleDeleteCompany = async (id) => {
    return await deleteCompany(id).unwrap();
  };

  return {
    handleDeleteCompany,
    isLoading,
    error,
    data,
  };
};
