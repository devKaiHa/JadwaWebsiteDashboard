import { FundsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const FundsPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFunds: builder.query({
      query: (query) => `${FundsEP}?${query}`,
      providesTags: ["FundsPage"],
    }),
    getOneFund: builder.query({
      query: (id) => `${FundsEP}/${id}`,
      providesTags: ["FundsPage"],
    }),

    postFund: builder.mutation({
      query: (formData) => ({
        url: FundsEP,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FundsPage"],
    }),

    updateFund: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${FundsEP}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["FundsPage"],
    }),

    deleteFund: builder.mutation({
      query: (id) => ({
        url: `${FundsEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FundsPage"],
    }),
  }),
});

export const {
  useGetAllFundsQuery,
  useGetOneFundQuery,
  usePostFundMutation,
  useUpdateFundMutation,
  useDeleteFundMutation,
} = FundsPageApi;
