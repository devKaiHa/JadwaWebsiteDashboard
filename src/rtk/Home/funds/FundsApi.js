import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { FundsEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const FundsApi = createApi({
  reducerPath: "FundsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["FundsApi"],
  endpoints: (builder) => ({
    getAllFunds: builder.query({
      query: (query) => `${FundsEndPoint}?${query}`,
      providesTags: ["Funds"],
    }),

    getOneFunds: builder.query({
      query: (id) => `${FundsEndPoint}/${id}`,
      providesTags: ["Funds"],
    }),
    postFunds: builder.mutation({
      query: (data) => ({
        url: FundsEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HomeSlider"],
    }),
    updateFunds: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${FundsEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Funds"],
    }),

    deleteFunds: builder.mutation({
      query: (id) => ({
        url: `${FundsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Funds"],
    }),
  }),
});

export const {
  useGetAllFundsQuery,
  useGetOneFundsQuery,
  usePostFundsMutation,
  useUpdateFundsMutation,
  useDeleteFundsMutation,
} = FundsApi;
