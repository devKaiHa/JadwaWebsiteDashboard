import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { ChooseUsEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const ChooseUsApi = createApi({
  reducerPath: "ChooseUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chooseus"],
  endpoints: (builder) => ({
    getAllChooseus: builder.query({
      query: (query) => `${ChooseUsEndPoint}?${query}`,
      providesTags: ["Chooseus"],
    }),

    getOneChooseus: builder.query({
      query: (id) => `${ChooseUsEndPoint}/${id}`,
      providesTags: ["Chooseus"],
    }),

    postChooseus: builder.mutation({
      query: (formData) => ({
        url: `${ChooseUsEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Chooseus"],
    }),

    updateChooseus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${ChooseUsEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Chooseus"],
    }),

    deleteOneChooseus: builder.mutation({
      query: (id) => ({
        url: `${ChooseUsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chooseus"],
    }),
  }),
});

export const {
  usePostChooseusMutation,
  useDeleteOneChooseusMutation,
  useGetAllChooseusQuery,
  useGetOneChooseusQuery,
  useUpdateChooseusMutation
} = ChooseUsApi;
