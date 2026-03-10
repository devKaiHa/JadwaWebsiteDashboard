import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { CompaniesEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const CompanyPageApi = createApi({
  reducerPath: "CompanyPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
       if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: (query) => `${CompaniesEndPoint}?${query}`,
      providesTags: ["Company"],
    }),

    getOneCompany: builder.query({
      query: (id) => `${CompaniesEndPoint}/${id}`,
      providesTags: ["Company"],
    }),

    postCompany: builder.mutation({
      query: (formData) => ({
        url: CompaniesEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Company"],
    }),

    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CompaniesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation({
      query: (deleteId) => ({
        url: `${CompaniesEndPoint}/${deleteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetOneCompanyQuery,
  usePostCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = CompanyPageApi;
