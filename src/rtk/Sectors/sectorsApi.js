import { SectorsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const sectorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSectors: builder.query({
      query: ({ q, active } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);
        if (active !== undefined && active !== null && active !== "") {
          params.append("active", String(active));
        }

        const queryString = params.toString();
        return queryString ? `${SectorsEP}?${queryString}` : SectorsEP;
      },
      providesTags: ["Sectors"],
    }),

    getSectorById: builder.query({
      query: (id) => `${SectorsEP}/${id}`,
      providesTags: ["Sectors"],
    }),

    createSector: builder.mutation({
      query: (data) => ({
        url: SectorsEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sectors"],
    }),

    updateSector: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SectorsEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sectors"],
    }),

    deleteSector: builder.mutation({
      query: (id) => ({
        url: `${SectorsEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sectors"],
    }),
  }),
});

export const {
  useGetSectorsQuery,
  useGetSectorByIdQuery,
  useCreateSectorMutation,
  useUpdateSectorMutation,
  useDeleteSectorMutation,
} = sectorsApi;
