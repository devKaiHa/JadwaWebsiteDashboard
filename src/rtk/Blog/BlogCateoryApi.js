import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { BlogCateoryEndPoint } from "../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const BlogCategoryApi = createApi({
  reducerPath: "BlogCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  tagTypes: ["BlogCateory"],
  endpoints: (builder) => ({
    // ✅ Get all blogs
    getAllBlogCategories: builder.query({
      query: () => `${BlogCateoryEndPoint}`,
      providesTags: ["BlogCateory"],
    }),

    // ✅ Get one blog by ID
    getOneBlogCateory: builder.query({
      query: (id) => `${BlogCateoryEndPoint}/${id}`,
      providesTags: ["BlogCateory"],
    }),

    // ✅ Post new blog
    createBlogCateory: builder.mutation({
      query: (formData) => ({
        url: `${BlogCateoryEndPoint}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["BlogCateory"],
    }),

    // ✅ Update existing blog
    updateBlogCateory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${BlogCateoryEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["BlogCateory"],
    }),

    // ✅ Delete a blog
    deleteBlogCateory: builder.mutation({
      query: (id) => ({
        url: `${BlogCateoryEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogCateory"],
    }),
  }),
});

export const {
  useGetAllBlogCategoriesQuery,
  useGetOneBlogCateoryQuery,
  useCreateBlogCateoryMutation,
  useUpdateBlogCateoryMutation,
  useDeleteBlogCateoryMutation,
} = BlogCategoryApi;
