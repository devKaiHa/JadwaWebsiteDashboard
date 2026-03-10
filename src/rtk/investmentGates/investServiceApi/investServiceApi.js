import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { InvestServiceEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const InvestServiceApi = createApi({
  reducerPath: "InvestServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["InvestService"],
  endpoints: (builder) => ({
    getAllInvestService: builder.query({
      query: (query) => `${InvestServiceEndPoint}?${query}`,
      providesTags: ["InvestService"],
    }),

    getOneInvestService: builder.query({
      query: (id) => `${InvestServiceEndPoint}/${id}`,
      providesTags: ["InvestService"],
    }),

    postInvestService: builder.mutation({
      query: (formData) => ({
        url: `${InvestServiceEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["InvestService"],
    }),

    updateInvestService: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${InvestServiceEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["InvestService"],
    }),

    deleteOneInvestService: builder.mutation({
      query: (id) => ({
        url: `${InvestServiceEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InvestService"],
    }),
  }),
});

export const {
  usePostInvestServiceMutation,
  useUpdateInvestServiceMutation,
  useDeleteOneInvestServiceMutation,
  useGetAllInvestServiceQuery,
  useGetOneInvestServiceQuery,
} = InvestServiceApi;
