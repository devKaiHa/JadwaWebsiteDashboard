import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { FooterEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const FooterApi = createApi({
  reducerPath: "FooterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["FooterApi"],
  endpoints: (builder) => ({
    getOneFooter: builder.query({
      query: () => `${FooterEndPoint}/one`,
      providesTags: ["FooterApi"],
    }),

    updatefooter: builder.mutation({
      query: ({ payload }) => ({
        url: `${FooterEndPoint}/one`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["FooterApi"],
    }),
  }),
});

export const { useGetOneFooterQuery, useUpdatefooterMutation } = FooterApi;
