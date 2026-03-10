import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { BlogEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const BlogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["blog"],
  endpoints: (builder) => ({
    // ✅ Get all blogs
    getAllBlogs: builder.query({
      query: ({ keyword, page, limit }) =>
        `${BlogEndPoint}?keyword=${keyword}&page=${page}&limit=${limit}`,
      providesTags: ["blog"],
    }),

    // ✅ Get one blog by ID
    getOneBlog: builder.query({
      query: (id) => `${BlogEndPoint}/${id}`,
      providesTags: ["blog"],
    }),

    // ✅ Post new blog
    postBlog: builder.mutation({
      query: (formData) => ({
        url: `${BlogEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    // ✅ Update existing blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BlogEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    // ✅ Delete a blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BlogEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetOneBlogQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = BlogApi;
