import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { InvestPartnerEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const InvestPartnerApi = createApi({
  reducerPath: "InvestPartnerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["InvestPartner"],
  endpoints: (builder) => ({
    getAllInvestPartner: builder.query({
      query: (query) => `${InvestPartnerEndPoint}?${query}`,
      providesTags: ["InvestPartner"],
    }),

    getOneInvestPartner: builder.query({
      query: (id) => `${InvestPartnerEndPoint}/${id}`,
      providesTags: ["InvestPartner"],
    }),

    postInvestPartner: builder.mutation({
      query: (formData) => ({
        url: `${InvestPartnerEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["InvestPartner"],
    }),

    updateInvestPartner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${InvestPartnerEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["InvestPartner"],
    }),

    deleteOneInvestPartner: builder.mutation({
      query: (id) => ({
        url: `${InvestPartnerEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InvestPartner"],
    }),
  }),
});

export const {
  usePostInvestPartnerMutation,
  useUpdateInvestPartnerMutation,
  useDeleteOneInvestPartnerMutation,
  useGetAllInvestPartnerQuery,
  useGetOneInvestPartnerQuery,
} = InvestPartnerApi;
