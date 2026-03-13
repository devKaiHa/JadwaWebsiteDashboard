import { FundsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const fundsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFunds: builder.query({
      query: ({ q, sector, featured, status, published } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);
        if (sector) params.append("sector", sector);
        if (featured !== undefined && featured !== null && featured !== "") {
          params.append("featured", String(featured));
        }
        if (status) params.append("status", status);
        if (published !== undefined && published !== null && published !== "") {
          params.append("published", String(published));
        }

        const queryString = params.toString();
        return queryString ? `${FundsEP}?${queryString}` : FundsEP;
      },
      providesTags: ["Funds"],
    }),

    getFundById: builder.query({
      query: (id) => `${FundsEP}/${id}`,
      providesTags: ["Funds"],
    }),

    createFund: builder.mutation({
      query: (data) => ({
        url: FundsEP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Funds"],
    }),

    updateFund: builder.mutation({
      query: ({ id, data }) => ({
        url: `${FundsEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Funds"],
    }),

    deleteFund: builder.mutation({
      query: (id) => ({
        url: `${FundsEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Funds"],
    }),
  }),
});

export const {
  useGetFundsQuery,
  useGetFundByIdQuery,
  useCreateFundMutation,
  useUpdateFundMutation,
  useDeleteFundMutation,
} = fundsApi;
