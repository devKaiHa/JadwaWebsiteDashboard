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
  /*
  {
  email: "info@example.com",
  phone: "+90 555 555 55 55",
  workingHours: {
    ar: "من الأحد إلى الخميس 9-5",
    en: "Sunday to Thursday 9-5",
  },
  investNowUrl: "https://invest.example.com",
  footerAbout: {
    ar: "نبذة عن الشركة",
    en: "About the company",
  },
  quickLinks: [
    {
      label: {
        ar: "من نحن",
        en: "About Us",
      },
      url: "/about",
      order: 0,
      isActive: true,
    },
  ],
  fundLinks: [
    {
      fund: "67ce1234abcd5678ef901234",
      order: 0,
      isActive: true,
    },
  ],
  addresses: [
    {
      city: "Gaziantep",
      address: {
        ar: "العنوان بالعربية",
        en: "Address in English",
      },
      mapUrl: "",
      phone: "+90 555 555 55 55",
      order: 0,
      isActive: true,
    },
  ],
  newsletterEnabled: true,
  privacyUrl: "/privacy",
  termsUrl: "/terms",
}
   */
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
