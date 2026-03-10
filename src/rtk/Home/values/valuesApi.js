import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { ValuesEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const ValuesApi = createApi({
  reducerPath: "Values",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["Values"],
  endpoints: (builder) => ({
    getAllValues: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `${ValuesEndPoint}?${queryString}`;
      },
      providesTags: ["Values"],
    }),

    postValues: builder.mutation({
      query: (data) => ({
        url: ValuesEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Values"],
    }),

    getOneValues: builder.query({
      query: (id) => `${ValuesEndPoint}/${id}`,
      providesTags: ["Values"],
    }),

    updateValues: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${ValuesEndPoint}/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Values"],
    }),

    deleteValues: builder.mutation({
      query: (id) => ({
        url: `${ValuesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Values"],
    }),
  }),
});

export const {
  useDeleteValuesMutation,
  usePostValuesMutation,
  useUpdateValuesMutation,
  useGetAllValuesQuery,
  useGetOneValuesQuery,
} = ValuesApi;
