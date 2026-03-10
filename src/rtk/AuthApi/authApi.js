import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { LogInEndPoint } from "../../Api/GlobalData"; // تأكد من المسار الصحيح

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    // ✅ Login Mutation
    login: builder.mutation({
      query: (formData) => ({
        url: LogInEndPoint,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
