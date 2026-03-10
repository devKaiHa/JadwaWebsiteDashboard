import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { AdvantageEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const AdvantageApi = createApi({
  reducerPath: "AdvantageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Advantage"],
  endpoints: (builder) => ({
    getAllAdvantage: builder.query({
      query: (query) => `${AdvantageEndPoint}${query}`,
      providesTags: ["Advantage"],
    }),

    getOneAdvantage: builder.query({
      query: (id) => `${AdvantageEndPoint}/${id}`,
      providesTags: ["Advantage"],
    }),

    postAdvantage: builder.mutation({
      query: (formData) => ({
        url: `${AdvantageEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Advantage"],
    }),

    updateAdvantage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${AdvantageEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Advantage"],
    }),

    deleteOneAdvantage: builder.mutation({
      query: (id) => ({
        url: `${AdvantageEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Advantage"],
    }),
  }),
});

export const {
  usePostAdvantageMutation,
  useUpdateAdvantageMutation,
  useDeleteOneAdvantageMutation,
  useGetAllAdvantageQuery,
  useGetOneAdvantageQuery,
} = AdvantageApi;
