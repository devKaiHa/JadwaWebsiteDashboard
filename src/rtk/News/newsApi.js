import { NewsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, q, published, page, limit } = {}) => {
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (q) params.append("q", q);

        if (published !== undefined && published !== null && published !== "") {
          params.append("published", String(published));
        }

        if (page) params.append("page", String(page));
        if (limit) params.append("limit", String(limit));

        const queryString = params.toString();
        return queryString ? `${NewsEP}?${queryString}` : NewsEP;
      },
      providesTags: ["News"],
    }),

    getNewsById: builder.query({
      query: (id) => `${NewsEP}/${id}`,
      providesTags: ["News"],
    }),

    createNews: builder.mutation({
      query: (data) => ({
        url: NewsEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["News"],
    }),

    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `${NewsEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["News"],
    }),

    deleteNews: builder.mutation({
      query: (id) => ({
        url: `${NewsEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
