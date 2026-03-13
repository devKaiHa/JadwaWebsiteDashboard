import {
  useGetResearchesQuery,
  useGetResearchByIdQuery,
  useCreateResearchMutation,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
} from "../../rtk/Research/researchApi";

export const useResearches = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetResearchesQuery(filters);

  return {
    researches: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useResearchById = (id) => {
  const { data, isLoading, error, refetch } = useGetResearchByIdQuery(id, {
    skip: !id,
  });

  return {
    research: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateResearch = () => {
  /*
  {
  title: {
    ar: "التقرير الشهري يناير 2026",
    en: "Monthly Report January 2026",
  },
  slug: "monthly-report-2026-01",
  category: "monthly",
  summary: {
    ar: "ملخص التقرير",
    en: "Report summary",
  },
  pdfUrl: "https://example.com/reports/monthly-report-2026-01.pdf",
  fileSize: 2480000,
  pagesCount: 32,
  charts: [
    {
      title: {
        ar: "النمو السنوي",
        en: "Annual Growth",
      },
      type: "line",
      data: {
        labels: ["2022", "2023", "2024", "2025"],
        values: [4.2, 5.1, 5.8, 6.0],
      },
      order: 0,
    },
  ],
  isPublished: true,
  order: 0,
}
  */
  const [createResearch, { isLoading, error, data }] =
    useCreateResearchMutation();

  const handleCreateResearch = async (payload) => {
    return await createResearch(payload).unwrap();
  };

  return {
    handleCreateResearch,
    isLoading,
    error,
    data,
  };
};

export const useUpdateResearch = () => {
  const [updateResearch, { isLoading, error, data }] =
    useUpdateResearchMutation();

  const handleUpdateResearch = async ({ id, payload }) => {
    return await updateResearch({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateResearch,
    isLoading,
    error,
    data,
  };
};

export const useDeleteResearch = () => {
  const [deleteResearch, { isLoading, error, data }] =
    useDeleteResearchMutation();

  const handleDeleteResearch = async (id) => {
    return await deleteResearch(id).unwrap();
  };

  return {
    handleDeleteResearch,
    isLoading,
    error,
    data,
  };
};
