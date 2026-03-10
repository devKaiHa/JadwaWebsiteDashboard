import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { PartnerEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");

export const PartnerApi = createApi({
  reducerPath: "partnerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["Partner"],
  endpoints: (builder) => ({
    getAllPartners: builder.query({
      query: (query) => `${PartnerEndPoint}?${query}`,
      providesTags: ["Partner"],
    }),

    getOnePartner: builder.query({
      query: (id) => `${PartnerEndPoint}/${id}`,
      providesTags: ["Partner"],
    }),

    postPartner: builder.mutation({
      query: (formData) => ({
        url: PartnerEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Partner"],
    }),

    updatePartner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${PartnerEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Partner"],
    }),

    deletePartner: builder.mutation({
      query: (id) => ({
        url: `${PartnerEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partner"],
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useGetOnePartnerQuery,
  usePostPartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = PartnerApi;
