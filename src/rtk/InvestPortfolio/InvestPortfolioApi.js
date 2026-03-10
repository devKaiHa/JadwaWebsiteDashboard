import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { InvestPortfolio } from "../../Api/GlobalData";

import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const InvestPortfolioApi = createApi({
  reducerPath: "InvestPortfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["portfolio"],
  endpoints: (builder) => ({
    getAllPortfolios: builder.query({
      query: (params) => ({
        url: InvestPortfolio,
        params,
      }),
      providesTags: ["portfolio"],
    }),

    getOnePortfolio: builder.query({
      query: (id) => `${InvestPortfolio}/${id}`,
      providesTags: ["portfolio"],
    }),

    createPortfolio: builder.mutation({
      query: (formData) => ({
        url: InvestPortfolio,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["portfolio"],
    }),

    updatePortfolio: builder.mutation({
      query: ({ id, data }) => ({
        url: `${InvestPortfolio}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["portfolio"],
    }),

    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `${InvestPortfolio}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["portfolio"],
    }),
  }),
});

export const {
  useGetAllPortfoliosQuery,
  useGetOnePortfolioQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = InvestPortfolioApi;
