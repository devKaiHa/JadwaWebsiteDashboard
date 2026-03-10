import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { CompanyNameEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");

export const CompanyNameApi = createApi({
  reducerPath: "CompanyNameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["CompanyNameApi"],
  endpoints: (builder) => ({
    getAllHmeCompaniesName: builder.query({
      query: ({ page = 1, limit = 5 }) =>
        `${CompanyNameEndPoint}?page=${page}&limit=${limit}`,
      providesTags: ["HomeCompanyName"],
    }),

    getOneCompanyName: builder.query({
      query: (id) => `${CompanyNameEndPoint}/${id}`,
      providesTags: ["HomeCompanyName"],
    }),
    postHomeCompanyName: builder.mutation({
      query: (payload) => ({
        url: CompanyNameEndPoint,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["HomeCompanyName"],
    }),

    updateCompanyName: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${CompanyNameEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["HomeCompanyName"],
    }),

    deleteCompnayName: builder.mutation({
      query: (id) => ({
        url: `${CompanyNameEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HomeCompanyName"],
    }),
  }),
});

export const {
  useGetAllHmeCompaniesNameQuery,
  useGetOneCompanyNameQuery,
  usePostHomeCompanyNameMutation,
  useUpdateCompanyNameMutation,
  useDeleteCompnayNameMutation,
} = CompanyNameApi;
