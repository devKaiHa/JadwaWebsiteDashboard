import { NewsletterEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const newslettersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: ({ q, active } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);

        if (active !== undefined && active !== null && active !== "") {
          params.append("active", String(active));
        }

        const queryString = params.toString();
        return queryString ? `${NewsletterEP}?${queryString}` : NewsletterEP;
      },
      providesTags: ["Newsletters"],
    }),

    updateSubscriber: builder.mutation({
      query: ({ id, data }) => ({
        url: `${NewsletterEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Newsletters"],
    }),

    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `${NewsletterEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Newsletters"],
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
} = newslettersApi;
