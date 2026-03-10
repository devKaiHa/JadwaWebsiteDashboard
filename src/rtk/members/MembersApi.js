import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { memberEndPoint } from "../../Api/GlobalData";

import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const MembersApi = createApi({
  reducerPath: "MembersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["member"],
  endpoints: (builder) => ({
    getAllMember: builder.query({
      query: (query) => `${memberEndPoint}?${query}`,
      providesTags: ["member"],
    }),
    getOneMember: builder.query({
      query: (id) => `${memberEndPoint}/${id}`,
      providesTags: ["member"],
    }),

    postMember: builder.mutation({
      query: (formData) => ({
        url: memberEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["member"],
    }),

    updateMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `${memberEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["member"],
    }),

    deleteMember: builder.mutation({
      query: (id) => ({
        url: `${memberEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["member"],
    }),
  }),
});

export const {
  useGetAllMemberQuery,
  useGetOneMemberQuery,
  usePostMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = MembersApi;
