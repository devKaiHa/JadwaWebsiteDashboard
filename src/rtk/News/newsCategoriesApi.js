import { NewsCategoriesEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const newsCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewsCategories: builder.query({
      query: ({ q, active } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);

        if (active !== undefined && active !== null && active !== "") {
          params.append("active", String(active));
        }

        const queryString = params.toString();
        return queryString
          ? `${NewsCategoriesEP}?${queryString}`
          : NewsCategoriesEP;
      },
      providesTags: ["NewsCategories"],
    }),

    getNewsCategoryById: builder.query({
      query: (id) => `${NewsCategoriesEP}/${id}`,
      providesTags: ["NewsCategories"],
    }),

    createNewsCategory: builder.mutation({
      query: (data) => ({
        url: NewsCategoriesEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewsCategories"],
    }),

    updateNewsCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${NewsCategoriesEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["NewsCategories"],
    }),

    deleteNewsCategory: builder.mutation({
      query: (id) => ({
        url: `${NewsCategoriesEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsCategories"],
    }),
  }),
});

export const {
  useGetNewsCategoriesQuery,
  useGetNewsCategoryByIdQuery,
  useCreateNewsCategoryMutation,
  useUpdateNewsCategoryMutation,
  useDeleteNewsCategoryMutation,
} = newsCategoriesApi;
