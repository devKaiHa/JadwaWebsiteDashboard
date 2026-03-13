import {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} from "../../../rtk/News/newsApi";

export const useNews = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetNewsQuery(filters);

  return {
    news: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useNewsById = (id) => {
  const { data, isLoading, error, refetch } = useGetNewsByIdQuery(id, {
    skip: !id,
  });

  return {
    newsItem: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateNews = () => {
  /*
  {
  title: {
    ar: "توسع الشركة في 2026",
    en: "Company Expands in 2026",
  },
  slug: "company-expands-2026",
  excerpt: {
    ar: "ملخص الخبر",
    en: "News excerpt",
  },
  content: {
    ar: "المحتوى الكامل للخبر",
    en: "Full news content",
  },
  image: "",
  category: "67ce1234abcd5678ef901234",
  tags: ["economy", "company"],
  author: "Admin",
  readTime: 4,
  isPublished: true,
  order: 0,
}
   */
  const [createNews, { isLoading, error, data }] = useCreateNewsMutation();

  const handleCreateNews = async (payload) => {
    return await createNews(payload).unwrap();
  };

  return {
    handleCreateNews,
    isLoading,
    error,
    data,
  };
};

export const useUpdateNews = () => {
  const [updateNews, { isLoading, error, data }] = useUpdateNewsMutation();

  const handleUpdateNews = async ({ id, payload }) => {
    return await updateNews({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateNews,
    isLoading,
    error,
    data,
  };
};

export const useDeleteNews = () => {
  const [deleteNews, { isLoading, error, data }] = useDeleteNewsMutation();

  const handleDeleteNews = async (id) => {
    return await deleteNews(id).unwrap();
  };

  return {
    handleDeleteNews,
    isLoading,
    error,
    data,
  };
};
