import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { ServiceEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");

export const ServiceApi = createApi({
  reducerPath: "service",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["service"],
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (query) => `${ServiceEndPoint}?${query}`,
      providesTags: ["service"],
    }),

    getOneService: builder.query({
      query: (id) => `${ServiceEndPoint}/${id}`,
      providesTags: ["service"],
    }),

    postService: builder.mutation({
      query: (formData) => ({
        url: `${ServiceEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${ServiceEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    deleteOneService: builder.mutation({
      query: (id) => ({
        url: `${ServiceEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetOneServiceQuery,
  usePostServiceMutation,
  useUpdateServiceMutation,
  useDeleteOneServiceMutation,
} = ServiceApi;
