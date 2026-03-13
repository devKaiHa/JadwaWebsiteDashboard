import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, {
  LoginEP,
  LogoutEP,
  RefreshEP,
  SeedAdminEP,
} from "../../Api/GlobalData";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: LoginEP,
        method: "POST",
        body: data,
      }),
    }),

    refresh: builder.mutation({
      query: () => ({
        url: RefreshEP,
        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: LogoutEP,
        method: "POST",
      }),
    }),

    seedAdmin: builder.mutation({
      query: ({ data, seedKey }) => ({
        url: SeedAdminEP,
        method: "POST",
        headers: {
          "x-seed-key": seedKey,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useSeedAdminMutation,
} = authApi;
