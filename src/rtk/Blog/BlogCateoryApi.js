import { NewsCategoriesEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const BlogCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogCategories: builder.query({
      query: () => `${NewsCategoriesEP}`,
      providesTags: ["BlogCateory"],
    }),

    getOneBlogCateory: builder.query({
      query: (id) => `${NewsCategoriesEP}/${id}`,
      providesTags: ["BlogCateory"],
    }),

    createBlogCateory: builder.mutation({
      query: (formData) => ({
        url: `${NewsCategoriesEP}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["BlogCateory"],
    }),

    updateBlogCateory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${NewsCategoriesEP}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["BlogCateory"],
    }),

    deleteBlogCateory: builder.mutation({
      query: (id) => ({
        url: `${NewsCategoriesEP}/${id}`,
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
