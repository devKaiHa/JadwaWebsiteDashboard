import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { InvestEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const InvestApi = createApi({
  reducerPath: "InvestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Invest"],
  endpoints: (builder) => ({
    getAllInvest: builder.query({
      query: (query) => `${InvestEndPoint}${query}`,
      providesTags: ["Invest"],
    }),

    getOneInvest: builder.query({
      query: (id) => `${InvestEndPoint}/${id}`,
      providesTags: ["Invest"],
    }),

    postInvest: builder.mutation({
      query: (formData) => ({
        url: `${InvestEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Invest"],
    }),

    updateInvest: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${InvestEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Invest"],
    }),

    deleteOneInvest: builder.mutation({
      query: (id) => ({
        url: `${InvestEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invest"],
    }),
  }),
});

export const {
  useDeleteOneInvestMutation,
  usePostInvestMutation,
  useGetAllInvestQuery,
  useGetOneInvestQuery,
  useUpdateInvestMutation,
} = InvestApi;
