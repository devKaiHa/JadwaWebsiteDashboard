import {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
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
  /*
  {
  title: {
    ar: "مطور واجهات أمامية أول",
    en: "Senior Frontend Developer",
  },
  slug: "senior-frontend-developer",
  description: {
    ar: "وصف الوظيفة",
    en: "Job description",
  },
  requirements: {
    ar: "المتطلبات",
    en: "Requirements",
  },
  location: "Gaziantep",
  employmentType: "full_time",
  isActive: true,
  isPublished: true,
  order: 0,
}
  */
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

export const useApplications = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetApplicationsQuery(filters);

  return {
    applications: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useApplicationById = (id) => {
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

export const useUpdateApplication = () => {
  const [updateApplication, { isLoading, error, data }] =
    useUpdateApplicationMutation();

  const handleUpdateApplication = async ({ id, payload }) => {
    return await updateApplication({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateApplication,
    isLoading,
    error,
    data,
  };
};

export const useDeleteApplication = () => {
  const [deleteApplication, { isLoading, error, data }] =
    useDeleteApplicationMutation();

  const handleDeleteApplication = async (id) => {
    return await deleteApplication(id).unwrap();
  };

  return {
    handleDeleteApplication,
    isLoading,
    error,
    data,
  };
};
