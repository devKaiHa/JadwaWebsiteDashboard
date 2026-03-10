import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { aboutHomeEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const AboutHomeApi = createApi({
  reducerPath: "AboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["AboutHome"],
  endpoints: (builder) => ({
    // getAllHmeSliders: builder.query({
    //   query: () => HomeSliderEndPoint,
    //   providesTags: ["FooterApi"],
    // }),

    getOneaboutHome: builder.query({
      query: (id) => `${aboutHomeEndPoint}/${id}`,
      providesTags: ["AboutHome"],
    }),

    updateaboutHome: builder.mutation({
      query: ({ id, body }) => ({
        url: `${aboutHomeEndPoint}/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["AboutHome"],
    }),

    // deleteEmployee: builder.mutation({
    //   query: (id) => ({
    //     url: `${aboutHomeEndPoint}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["FooterApi"],
    // }),
  }),
});

export const { useGetOneaboutHomeQuery, useUpdateaboutHomeMutation } = AboutHomeApi;
