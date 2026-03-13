import {
  useGetMeQuery,
  useUpdateMeMutation,
} from "../../rtk/UsersApi/usersApi";

export const useMe = () => {
  const { data, isLoading, error, refetch } = useGetMeQuery();

  return {
    user: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateMe = () => {
  const [updateMe, { isLoading, error, data }] = useUpdateMeMutation();

  const handleUpdateMe = async (payload) => {
    return await updateMe(payload).unwrap();
  };

  return {
    handleUpdateMe,
    isLoading,
    error,
    data,
  };
};
