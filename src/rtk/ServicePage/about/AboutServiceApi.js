import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { AboutServiceEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const AboutServiceApi = createApi({
  reducerPath: "AboutServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["AboutService"],
  endpoints: (builder) => ({
    // getAllHmeSliders: builder.query({
    //   query: () => HomeSliderEndPoint,
    //   providesTags: ["AboutService"],
    // }),

    getOneAboutService: builder.query({
      query: () => `${AboutServiceEndPoint}/one`,
      providesTags: ["AboutService"],
    }),

    updateAboutService: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${AboutServiceEndPoint}/one`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["AboutService"],
    }),

    // deleteEmployee: builder.mutation({
    //   query: (id) => ({
    //     url: `${AboutServiceEndPoint}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["AboutService"],
    // }),
  }),
});

export const { useGetOneAboutServiceQuery, useUpdateAboutServiceMutation } =
  AboutServiceApi;
