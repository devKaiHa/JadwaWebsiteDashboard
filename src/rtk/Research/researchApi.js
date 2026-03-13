import { ResearchEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const researchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResearches: builder.query({
      query: ({ category, q, published } = {}) => {
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (q) params.append("q", q);

        if (published !== undefined && published !== null && published !== "") {
          params.append("published", String(published));
        }

        const queryString = params.toString();
        return queryString ? `${ResearchEP}?${queryString}` : ResearchEP;
      },
      providesTags: ["Researches"],
    }),

    getResearchById: builder.query({
      query: (id) => `${ResearchEP}/${id}`,
      providesTags: ["Researches"],
    }),

    createResearch: builder.mutation({
      query: (data) => ({
        url: ResearchEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Researches"],
    }),

    updateResearch: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ResearchEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Researches"],
    }),

    deleteResearch: builder.mutation({
      query: (id) => ({
        url: `${ResearchEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Researches"],
    }),
  }),
});

export const {
  useGetResearchesQuery,
  useGetResearchByIdQuery,
  useCreateResearchMutation,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
} = researchesApi;
