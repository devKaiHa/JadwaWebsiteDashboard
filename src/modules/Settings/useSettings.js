import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../rtk/Settings/settingsApi";

export const useSettings = () => {
  const { data, isLoading, error, refetch } = useGetSettingsQuery();

  return {
    settings: data?.data || {},
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateSettings = () => {
  const [updateSettings, { isLoading, error, data }] =
    useUpdateSettingsMutation();

  const handleUpdateSettings = async (payload) => {
    return await updateSettings(payload).unwrap();
  };

  return {
    handleUpdateSettings,
    isLoading,
    error,
    data,
  };
};
