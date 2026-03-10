import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { StagesEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const StagesApi = createApi({
  reducerPath: "StagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Stages"],
  endpoints: (builder) => ({
    getAllStages: builder.query({
      query: (query) => `${StagesEndPoint}${query}`,
      providesTags: ["Stages"],
    }),

    getOneStages: builder.query({
      query: (id) => `${StagesEndPoint}/${id}`,
      providesTags: ["Stages"],
    }),

    postStages: builder.mutation({
      query: (formData) => ({
        url: `${StagesEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Stages"],
    }),

    updateStages: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${StagesEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Stages"],
    }),

    deleteOneStages: builder.mutation({
      query: (id) => ({
        url: `${StagesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stages"],
    }),
  }),
});

export const {
  usePostStagesMutation,
  useUpdateStagesMutation,
  useDeleteOneStagesMutation,
  useGetAllStagesQuery,
  useGetOneStagesQuery,
} = StagesApi;
