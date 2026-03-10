import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { HomeSliderEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const HomeSliderApi = createApi({
  reducerPath: "HomeSlider",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["HomeSlider"],
  endpoints: (builder) => ({
    getAllHmeSliders: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `${HomeSliderEndPoint}?${queryString}`;
      },
      providesTags: ["HomeSlider"],
    }),

    postHomeSlider: builder.mutation({
      query: (data) => ({
        url: HomeSliderEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HomeSlider"],
    }),

    getOneSlider: builder.query({
      query: (id) => `${HomeSliderEndPoint}/${id}`,
      providesTags: ["HomeSlider"],
    }),

    updateSlider: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${HomeSliderEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["HomeSlider"],
    }),

    deletehomeSlider: builder.mutation({
      query: (id) => ({
        url: `${HomeSliderEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HomeSlider"],
    }),
  }),
});

export const {
  useGetAllHmeSlidersQuery,
  usePostHomeSliderMutation,
  useDeletehomeSliderMutation,
  useGetOneSliderQuery,
  useUpdateSliderMutation
} = HomeSliderApi;
