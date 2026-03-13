import { JobEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ q, active, published } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);

        if (active !== undefined && active !== null && active !== "") {
          params.append("active", String(active));
        }

        if (published !== undefined && published !== null && published !== "") {
          params.append("published", String(published));
        }

        const queryString = params.toString();
        return queryString ? `${JobEP}?${queryString}` : JobEP;
      },
      providesTags: ["Jobs"],
    }),

    getJobById: builder.query({
      query: (id) => `${JobEP}/${id}`,
      providesTags: ["Jobs"],
    }),

    createJob: builder.mutation({
      query: (data) => ({
        url: JobEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `${JobEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `${JobEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    getApplications: builder.query({
      query: ({ job, status, q } = {}) => {
        const params = new URLSearchParams();

        if (job) params.append("job", job);
        if (status) params.append("status", status);
        if (q) params.append("q", q);

        const queryString = params.toString();
        return queryString
          ? `${JobEP}/applications/list?${queryString}`
          : `${JobEP}/applications/list`;
      },
      providesTags: ["Jobs"],
    }),

    getApplicationById: builder.query({
      query: (id) => `${JobEP}/applications/${id}`,
      providesTags: ["Jobs"],
    }),

    updateApplication: builder.mutation({
      query: ({ id, data }) => ({
        url: `${JobEP}/applications/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `${JobEP}/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = jobsApi;
