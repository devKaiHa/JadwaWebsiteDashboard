import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { QuestionEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

const jwt = Cookies.get("Token");

export const QuestionApi = createApi({
  reducerPath: "QuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    getAllQuestion: builder.query({
      query: (query) => `${QuestionEndPoint}${query}`,
      providesTags: ["Question"],
    }),

    getOneQuestion: builder.query({
      query: (id) => `${QuestionEndPoint}/${id}`,
      providesTags: ["Question"],
    }),

    postQuestion: builder.mutation({
      query: (formData) => ({
        url: `${QuestionEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Question"],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${QuestionEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Question"],
    }),

    deleteOneQuestion: builder.mutation({
      query: (id) => ({
        url: `${QuestionEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),
  }),
});

export const {
  useDeleteOneQuestionMutation,
  useGetAllQuestionQuery,
  useGetOneQuestionQuery,
  useUpdateQuestionMutation,
  usePostQuestionMutation,
} = QuestionApi;
