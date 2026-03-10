import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { CountriesEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const CountriesApi = createApi({
  reducerPath: "CountriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["CountriesApi"],
  endpoints: (builder) => ({
    getAllHmeCountries: builder.query({
      query: (query) => `${CountriesEndPoint}?${query}`,
      providesTags: ["Countries"],
    }),

    getOneCountry: builder.query({
      query: (id) => `${CountriesEndPoint}/${id}`,
      providesTags: ["Countries"],
    }),
    postHomeCountry: builder.mutation({
      query: (payload) => ({
        url: CountriesEndPoint,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Countries"],
    }),
    updateCountry: builder.mutation({
      query: ({ id, body }) => ({
        url: `${CountriesEndPoint}/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Countries"],
    }),

    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `${CountriesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Countries"],
    }),
  }),
});

export const {
  useGetAllHmeCountriesQuery,
  useGetOneCountryQuery,
  usePostHomeCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = CountriesApi;
