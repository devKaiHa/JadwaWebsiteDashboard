import { ProjectsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ q, fund, sector, status, published } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);
        if (fund) params.append("fund", fund);
        if (sector) params.append("sector", sector);
        if (status) params.append("status", status);

        if (published !== undefined && published !== null && published !== "") {
          params.append("published", String(published));
        }

        const queryString = params.toString();
        return queryString ? `${ProjectsEP}?${queryString}` : ProjectsEP;
      },
      providesTags: ["Projects"],
    }),

    getProjectById: builder.query({
      query: (id) => `${ProjectsEP}/${id}`,
      providesTags: ["Projects"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: ProjectsEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ProjectsEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${ProjectsEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
