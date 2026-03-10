import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { CompaniesDetailEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const CompanyDetailPageApi = createApi({
  reducerPath: "CompanyDetailPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
       if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["CompanyDetail"],
  endpoints: (builder) => ({
    getAllCompaniesDetail: builder.query({
      query: (query) => `${CompaniesDetailEndPoint}?${query}`,
      providesTags: ["CompanyDetail"],
    }),

    getOneCompanyDetail: builder.query({
      query: (id) => `${CompaniesDetailEndPoint}/${id}`,
      providesTags: ["CompanyDetail"],
    }),

    postCompanyDetail: builder.mutation({
      query: (formData) => ({
        url: CompaniesDetailEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CompanyDetail"],
    }),

    updateCompanyDetail: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CompaniesDetailEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CompanyDetail"],
    }),

    deleteCompanyDetail: builder.mutation({
      query: (deleteId) => ({
        url: `${CompaniesDetailEndPoint}/${deleteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyDetail"],
    }),
  }),
});

export const {
  useGetAllCompaniesDetailQuery,
  useGetOneCompanyDetailQuery,
  usePostCompanyDetailMutation,
  useUpdateCompanyDetailMutation,
  useDeleteCompanyDetailMutation,
} = CompanyDetailPageApi;
