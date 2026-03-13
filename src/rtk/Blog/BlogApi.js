import { NewsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: ({ keyword, page, limit }) =>
        `${NewsEP}?keyword=${keyword}&page=${page}&limit=${limit}`,
      providesTags: ["blog"],
    }),

    getOneBlog: builder.query({
      query: (id) => `${NewsEP}/${id}`,
      providesTags: ["blog"],
    }),

    postBlog: builder.mutation({
      query: (formData) => ({
        url: `${NewsEP}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${NewsEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${NewsEP}/${id}`,
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
