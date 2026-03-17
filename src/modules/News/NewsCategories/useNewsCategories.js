import {
  useGetNewsCategoriesQuery,
  useGetNewsCategoryByIdQuery,
  useCreateNewsCategoryMutation,
  useUpdateNewsCategoryMutation,
  useDeleteNewsCategoryMutation,
} from "../../../rtk/News/newsCategoriesApi";

export const useNewsCategories = (filters = {}) => {
  const { data, isLoading, error, refetch } =
    useGetNewsCategoriesQuery(filters);

  return {
    newsCategories: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useNewsCategoryById = (id) => {
  const { data, isLoading, error, refetch } = useGetNewsCategoryByIdQuery(id, {
    skip: !id,
  });

  return {
    newsCategory: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateNewsCategory = () => {
  const [createNewsCategory, { isLoading, error, data }] =
    useCreateNewsCategoryMutation();

  const handleCreateNewsCategory = async (payload) => {
    return await createNewsCategory(payload).unwrap();
  };

  return {
    handleCreateNewsCategory,
    isLoading,
    error,
    data,
  };
};

export const useUpdateNewsCategory = () => {
  const [updateNewsCategory, { isLoading, error, data }] =
    useUpdateNewsCategoryMutation();

  const handleUpdateNewsCategory = async ({ id, payload }) => {
    return await updateNewsCategory({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateNewsCategory,
    isLoading,
    error,
    data,
  };
};

export const useDeleteNewsCategory = () => {
  const [deleteNewsCategory, { isLoading, error, data }] =
    useDeleteNewsCategoryMutation();

  const handleDeleteNewsCategory = async (id) => {
    return await deleteNewsCategory(id).unwrap();
  };

  return {
    handleDeleteNewsCategory,
    isLoading,
    error,
    data,
  };
};
