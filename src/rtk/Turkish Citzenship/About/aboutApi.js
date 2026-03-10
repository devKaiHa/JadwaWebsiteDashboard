import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { AboutEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");

export const AboutApi = createApi({
  reducerPath: "AboutTurkishApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["AboutTurkish"],
  endpoints: (builder) => ({
    getAllAbout: builder.query({
      query: (query) => `${AboutEndPoint}?${query}`,
      providesTags: ["AboutTurkish"],
    }),

    getOneAboutTurkish: builder.query({
      query: () => `${AboutEndPoint}/one`,
      providesTags: ["AboutTurkish"],
    }),

    postAbout: builder.mutation({
      query: (formData) => ({
        url: `${AboutEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutTurkish"],
    }),

    updateAboutTurkish: builder.mutation({
      query: ({ data }) => ({
        url: `${AboutEndPoint}/one`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AboutTurkish"],
    }),

    deleteOneAbout: builder.mutation({
      query: () => ({
        url: `${AboutEndPoint}/one`,
        method: "DELETE",
      }),
      invalidatesTags: ["AboutTurkish"],
    }),
  }),
});

export const {
  useUpdateAboutTurkishMutation,
  usePostAboutMutation,
  useGetAllAboutQuery,
  useGetOneAboutTurkishQuery,
} = AboutApi;
