import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { CompaniesHomeEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");

export const HomeCompaniesApi = createApi({
  reducerPath: "HomeCompanyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["HomeCompanyApi"],
  endpoints: (builder) => ({
    getAllHmeCompanies: builder.query({
      query: (query) => `${CompaniesHomeEndPoint}?${query}`,
      providesTags: ["HomeCompany"],
    }),

    getOneCompany: builder.query({
      query: (id) => `${CompaniesHomeEndPoint}/${id}`,
      providesTags: ["HomeCompany"],
    }),
    postHomeCompany: builder.mutation({
      query: (payload) => ({
        url: CompaniesHomeEndPoint,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["HomeSectorsApi"],
    }),

    updateCompany: builder.mutation({
      query: ({ id, body }) => ({
        url: `${CompaniesHomeEndPoint}/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["HomeCompany"],
    }),

    deleteCompnay: builder.mutation({
      query: (id) => ({
        url: `${CompaniesHomeEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HomeCompany"],
    }),
  }),
});

export const {
  useGetAllHmeCompaniesQuery,
  useGetOneCompanyQuery,
  usePostHomeCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompnayMutation,
} = HomeCompaniesApi;
