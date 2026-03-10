import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { fundsEndPoint } from "../../Api/GlobalData";

import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const FundsPageApi = createApi({
  reducerPath: "FundsPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["FundsPage"],
  endpoints: (builder) => ({
    getAllFunds: builder.query({
      query: (query) => `${fundsEndPoint}?${query}`,
      providesTags: ["FundsPage"],
    }),
    getOneFund: builder.query({
      query: (id) => `${fundsEndPoint}/${id}`,
      providesTags: ["FundsPage"],
    }),

    postFund: builder.mutation({
      query: (formData) => ({
        url: fundsEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FundsPage"],
    }),

    updateFund: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${fundsEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["FundsPage"],
    }),

    deleteFund: builder.mutation({
      query: (id) => ({
        url: `${fundsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FundsPage"],
    }),
  }),
});

export const {
  useGetAllFundsQuery,
  useGetOneFundQuery,
  usePostFundMutation,
  useUpdateFundMutation,
  useDeleteFundMutation,
} = FundsPageApi;
