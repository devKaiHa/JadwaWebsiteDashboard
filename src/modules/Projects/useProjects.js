import {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../rtk/Projects/projectsApi";

export const useProjects = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetProjectsQuery(filters);

  return {
    projects: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useProjectById = (id) => {
  const { data, isLoading, error, refetch } = useGetProjectByIdQuery(id, {
    skip: !id,
  });

  return {
    project: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateProject = () => {
  /*
  Payload: {
  fund: "67ce1234abcd5678ef901234",
  sector: "67ce9999abcd5678ef909999",
  name: {
    ar: "مشروع حلب التجاري",
    en: "Aleppo Retail Project",
  },
  description: {
    ar: "وصف المشروع",
    en: "Project description",
  },
  slug: "aleppo-retail-project",
  image: "",
  ownershipPercentage: 35,
  status: "active",
  isPublished: true,
  order: 0,
}
   */
  const [createProject, { isLoading, error, data }] =
    useCreateProjectMutation();

  const handleCreateProject = async (payload) => {
    return await createProject(payload).unwrap();
  };

  return {
    handleCreateProject,
    isLoading,
    error,
    data,
  };
};

export const useUpdateProject = () => {
  const [updateProject, { isLoading, error, data }] =
    useUpdateProjectMutation();

  const handleUpdateProject = async ({ id, payload }) => {
    return await updateProject({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateProject,
    isLoading,
    error,
    data,
  };
};

export const useDeleteProject = () => {
  const [deleteProject, { isLoading, error, data }] =
    useDeleteProjectMutation();

  const handleDeleteProject = async (id) => {
    return await deleteProject(id).unwrap();
  };

  return {
    handleDeleteProject,
    isLoading,
    error,
    data,
  };
};
