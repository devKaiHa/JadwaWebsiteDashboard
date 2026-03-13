import {
  useCreateFundMutation,
  useDeleteFundMutation,
  useGetFundByIdQuery,
  useGetFundsQuery,
  useUpdateFundMutation,
} from "../../../rtk/funds/FundsApi";

export const useFunds = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetFundsQuery(filters);

  return {
    funds: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useFundById = (id) => {
  const { data, isLoading, error, refetch } = useGetFundByIdQuery(id, {
    skip: !id,
  });

  return {
    fund: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateFund = () => {
  /*
  Payload: {
  name: { ar, en },
  slug: "tech-growth-fund",
  type: "open" | "closed",
  sector: "sectorObjectId",

  investmentStrategy?: { ar, en },
  duration?: "",
  assetsSize?: "",
  minimumSubscription?: "",
  expectedReturn?: "",
  riskLevel?: "low" | "medium" | "high",

  performance?: [
    { label: "2024", value: 12.5 }
  ],

  reports?: [
    {
      title: { ar, en },
      fileUrl: "https://...",
      type: "report" | "prospectus",
      publishedAt: "2026-03-10T00:00:00.000Z"
    }
  ],

  managementTeam?: [
    {
      name: "John Doe",
      position: { ar, en },
      image: "",
      order: 0
    }
  ],

  image?: "",
  isFeatured?: true,
  status?: "active" | "closed",
  isPublished?: true,
  order?: 0
}
   */
  const [createFund, { isLoading, error, data }] = useCreateFundMutation();

  const handleCreateFund = async (payload) => {
    return await createFund(payload).unwrap();
  };

  return {
    handleCreateFund,
    isLoading,
    error,
    data,
  };
};

export const useUpdateFund = () => {
  const [updateFund, { isLoading, error, data }] = useUpdateFundMutation();

  const handleUpdateFund = async ({ id, payload }) => {
    return await updateFund({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateFund,
    isLoading,
    error,
    data,
  };
};

export const useDeleteFund = () => {
  const [deleteFund, { isLoading, error, data }] = useDeleteFundMutation();

  const handleDeleteFund = async (id) => {
    return await deleteFund(id).unwrap();
  };

  return {
    handleDeleteFund,
    isLoading,
    error,
    data,
  };
};
