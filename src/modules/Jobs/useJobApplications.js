import {
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} from "../../rtk/Jobs/jobsApi";

export const useJobApplications = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetApplicationsQuery(filters);

  return {
    applications: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useJobApplicationById = (id) => {
  const { data, isLoading, error, refetch } = useGetApplicationByIdQuery(id, {
    skip: !id,
  });

  return {
    application: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateJobApplication = () => {
  const [updateApplication, { isLoading, error, data }] =
    useUpdateApplicationMutation();

  const handleUpdateJobApplication = async ({ id, payload }) => {
    return await updateApplication({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateJobApplication,
    isLoading,
    error,
    data,
  };
};

export const useDeleteJobApplication = () => {
  const [deleteApplication, { isLoading, error, data }] =
    useDeleteApplicationMutation();

  const handleDeleteJobApplication = async (id) => {
    return await deleteApplication(id).unwrap();
  };

  return {
    handleDeleteJobApplication,
    isLoading,
    error,
    data,
  };
};
