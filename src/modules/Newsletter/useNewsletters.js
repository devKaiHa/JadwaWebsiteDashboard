import {
  useGetSubscribersQuery,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
} from "../../rtk/Newsletter/newsletterApi";

export const useSubscribers = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetSubscribersQuery(filters);

  return {
    subscribers: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateSubscriber = () => {
  const [updateSubscriber, { isLoading, error, data }] =
    useUpdateSubscriberMutation();

  const handleUpdateSubscriber = async ({ id, payload }) => {
    return await updateSubscriber({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateSubscriber,
    isLoading,
    error,
    data,
  };
};

export const useDeleteSubscriber = () => {
  const [deleteSubscriber, { isLoading, error, data }] =
    useDeleteSubscriberMutation();

  const handleDeleteSubscriber = async (id) => {
    return await deleteSubscriber(id).unwrap();
  };

  return {
    handleDeleteSubscriber,
    isLoading,
    error,
    data,
  };
};
