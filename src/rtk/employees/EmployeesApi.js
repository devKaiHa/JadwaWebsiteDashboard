import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL,{boardMemberEndPoint} from "../../Api/GlobalData";

import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const TeamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
     if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: () => boardMemberEndPoint,
      providesTags: ["Team"],
    }),

    getOneEmployee: builder.query({
      query: (id) => `${boardMemberEndPoint}/${id}`,
      providesTags: ["Team"],
    }),

    postEmployee: builder.mutation({
      query: (formData) => ({
        url: boardMemberEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Team"],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${boardMemberEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Team"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `${boardMemberEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamQuery,
  useGetOneEmployeeQuery,
  usePostEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = TeamApi;
