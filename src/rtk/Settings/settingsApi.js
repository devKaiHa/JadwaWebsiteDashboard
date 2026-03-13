import { SettingsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => SettingsEP,
      providesTags: ["Settings"],
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: SettingsEP,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
