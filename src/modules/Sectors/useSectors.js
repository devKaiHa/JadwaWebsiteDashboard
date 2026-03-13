import {
  useCreateSectorMutation,
  useDeleteSectorMutation,
  useGetSectorByIdQuery,
  useGetSectorsQuery,
  useUpdateSectorMutation,
} from "../../rtk/Sectors/sectorsApi";

export const useSectors = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetSectorsQuery(filters);

  return {
    sectors: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useSectorById = (id) => {
  const { data, isLoading, error, refetch } = useGetSectorByIdQuery(id, {
    skip: !id,
  });

  return {
    sector: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateSector = () => {
  /*
  Payload: {
  name: {
    ar: "التجزئة",
    en: "Retail",
  },
  description: {
    ar: "وصف عربي",
    en: "English description",
  },
  slug: "retail",
  image: "",
  isActive: true,
  order: 0,
}
   */
  const [createSector, { isLoading, error, data }] = useCreateSectorMutation();

  const handleCreateSector = async (payload) => {
    const res = await createSector(payload).unwrap();
    return res;
  };

  return {
    handleCreateSector,
    isLoading,
    error,
    data,
  };
};

export const useUpdateSector = () => {
  const [updateSector, { isLoading, error, data }] = useUpdateSectorMutation();

  const handleUpdateSector = async ({ id, payload }) => {
    const res = await updateSector({ id, data: payload }).unwrap();
    return res;
  };

  return {
    handleUpdateSector,
    isLoading,
    error,
    data,
  };
};

export const useDeleteSector = () => {
  const [deleteSector, { isLoading, error, data }] = useDeleteSectorMutation();

  const handleDeleteSector = async (id) => {
    const res = await deleteSector(id).unwrap();
    return res;
  };

  return {
    handleDeleteSector,
    isLoading,
    error,
    data,
  };
};
