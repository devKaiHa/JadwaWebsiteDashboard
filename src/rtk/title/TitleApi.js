import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { TitleEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");

export const TitleApi = createApi({
  reducerPath: "TitleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Title"],
  endpoints: (builder) => ({
    // getAllServices: builder.query({
    //   query: (query) => `${TitleEndPoint}?${query}`,
    //   providesTags: ["Title"],
    // }),

    getOneTitle: builder.query({
      query: (id) => `${TitleEndPoint}/${id}`,
      providesTags: ["Title"],
    }),

    // postService: builder.mutation({
    //   query: (formData) => ({
    //     url: `${TitleEndPoint}`,
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["Title"],
    // }),

    updateTitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TitleEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Title"],
    }),

    // deleteOneService: builder.mutation({
    //   query: (id) => ({
    //     url: `${TitleEndPoint}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Title"],
    // }),
  }),
});

export const { useGetOneTitleQuery, useUpdateTitleMutation } = TitleApi;
