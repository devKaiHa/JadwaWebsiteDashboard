import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { PlansEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const PlansApi = createApi({
  reducerPath: "PlansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["Plans"],
  endpoints: (builder) => ({
    // getAllHmeSliders: builder.query({
    //   query: () => HomeSliderEndPoint,
    //   providesTags: ["AboutService"],
    // }),

    getOnePlansService: builder.query({
      query: () => `${PlansEndPoint}/one`,
      providesTags: ["Plans"],
    }),

    updatePlansService: builder.mutation({
      query: ({ payload }) => ({
        url: `${PlansEndPoint}/one`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Plans"],
    }),

    // deleteEmployee: builder.mutation({
    //   query: (id) => ({
    //     url: `${PlansEndPoint}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["AboutService"],
    // }),
  }),
});

export const { useGetOnePlansServiceQuery, useUpdatePlansServiceMutation } =
  PlansApi;
