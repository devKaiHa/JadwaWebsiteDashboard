// rtk/Contact/contactApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { ContactusEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const ContactApi = createApi({
  reducerPath: "contact",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getOneContact: builder.query({
      query: () => `${ContactusEndPoint}/one`,
      providesTags: ["contact"],
    }),

    updateContact: builder.mutation({
      query: (data) => ({
        url: `${ContactusEndPoint}/one`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const { useGetOneContactQuery, useUpdateContactMutation } = ContactApi;
