import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { HeaderEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const HeaderApi = createApi({
  reducerPath: "HeaderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Header"],
  endpoints: (builder) => ({
    getAllHeader: builder.query({
      query: (query) => `${HeaderEndPoint}?${query}`,
      providesTags: ["Header"],
    }),

    getOneHeader: builder.query({
      query: (id) => `${HeaderEndPoint}/${id}`,
      providesTags: ["Header"],
    }),

    postHeader: builder.mutation({
      query: (formData) => ({
        url: `${HeaderEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Header"],
    }),

    updateHeader: builder.mutation({
      query: ({ id, data }) => ({
        url: `${HeaderEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Header"],
    }),

    deleteOneHeader: builder.mutation({
      query: (id) => ({
        url: `${HeaderEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Header"],
    }),
  }),
});

export const {
  usePostHeaderMutation,
  useUpdateHeaderMutation,
  useDeleteOneHeaderMutation,
  useGetAllHeaderQuery,
  useGetOneHeaderQuery,
} = HeaderApi;
