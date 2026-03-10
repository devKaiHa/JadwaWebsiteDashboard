import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { HomeSectorsEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const HomeSectorsApi = createApi({
  reducerPath: "HomeSectorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["HomeSectorsApi"],
  endpoints: (builder) => ({
    getAllHomeSectors: builder.query({
      query: (query) => `${HomeSectorsEndPoint}?${query}`,
      providesTags: ["HomeSectorsApi"],
    }),

    postHomeSectors: builder.mutation({
      query: (payload) => ({
        url: HomeSectorsEndPoint,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["HomeSectorsApi"],
    }),

    getOneHomeSector: builder.query({
      query: (id) => `${HomeSectorsEndPoint}/${id}`,
      providesTags: ["HomeSectorsApi"],
    }),

    updateHomeSector: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${HomeSectorsEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["HomeSectorsApi"],
    }),
    updateHomeSectorTitle: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${HomeSectorsEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["HomeSectorsApi"],
    }),

    DeleteSector: builder.mutation({
      query: (id) => ({
        url: `${HomeSectorsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HomeSectorsApi"],
    }),
  }),
});

export const {
  useGetAllHomeSectorsQuery,
  usePostHomeSectorsMutation,
  useDeleteSectorMutation,
  useGetOneHomeSectorQuery,
  useUpdateHomeSectorMutation,
  useUpdateHomeSectorTitleMutation,
} = HomeSectorsApi;
