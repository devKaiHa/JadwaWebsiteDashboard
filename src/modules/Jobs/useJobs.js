import {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "../../rtk/Jobs/jobsApi";

export const useJobs = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetJobsQuery(filters);

  return {
    jobs: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useJobById = (id) => {
  const { data, isLoading, error, refetch } = useGetJobByIdQuery(id, {
    skip: !id,
  });

  return {
    job: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateJob = () => {
  const [createJob, { isLoading, error, data }] = useCreateJobMutation();

  const handleCreateJob = async (payload) => {
    return await createJob(payload).unwrap();
  };

  return {
    handleCreateJob,
    isLoading,
    error,
    data,
  };
};

export const useUpdateJob = () => {
  const [updateJob, { isLoading, error, data }] = useUpdateJobMutation();

  const handleUpdateJob = async ({ id, payload }) => {
    return await updateJob({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateJob,
    isLoading,
    error,
    data,
  };
};

export const useDeleteJob = () => {
  const [deleteJob, { isLoading, error, data }] = useDeleteJobMutation();

  const handleDeleteJob = async (id) => {
    return await deleteJob(id).unwrap();
  };

  return {
    handleDeleteJob,
    isLoading,
    error,
    data,
  };
};
