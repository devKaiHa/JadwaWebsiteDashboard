import { CompaniesEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ q, project, sector, status, published } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);
        if (project) params.append("project", project);
        if (sector) params.append("sector", sector);
        if (status) params.append("status", status);

        if (published !== undefined && published !== null && published !== "") {
          params.append("published", String(published));
        }

        const queryString = params.toString();
        return queryString ? `${CompaniesEP}?${queryString}` : CompaniesEP;
      },
      providesTags: ["Company"],
    }),

    getCompanyById: builder.query({
      query: (id) => `${CompaniesEP}/${id}`,
      providesTags: ["Company"],
    }),

    createCompany: builder.mutation({
      query: (data) => ({
        url: CompaniesEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),

    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CompaniesEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `${CompaniesEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
