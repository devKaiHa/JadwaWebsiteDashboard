import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { TurkishServiceEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const ServiceTApi = createApi({
  reducerPath: "ServiceTApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ServiceT"],
  endpoints: (builder) => ({
    getAllServiceT: builder.query({
      query: (query) => `${TurkishServiceEndPoint}${query}`,
      providesTags: ["ServiceT"],
    }),

    getOneServiceT: builder.query({
      query: (id) => `${TurkishServiceEndPoint}/${id}`,
      providesTags: ["ServiceT"],
    }),

    postServiceT: builder.mutation({
      query: (formData) => ({
        url: `${TurkishServiceEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ServiceT"],
    }),

    updateServiceT: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${TurkishServiceEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ServiceT"],
    }),

    deleteOneServiceT: builder.mutation({
      query: (id) => ({
        url: `${TurkishServiceEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceT"],
    }),
  }),
});

export const {
  useDeleteOneServiceTMutation,
  useGetAllServiceTQuery,
  useGetOneServiceTQuery,
  useUpdateServiceTMutation,
  usePostServiceTMutation,
} = ServiceTApi;
