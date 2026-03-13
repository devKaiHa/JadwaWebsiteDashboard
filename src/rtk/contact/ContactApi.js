import { ContactEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ q, type, status } = {}) => {
        const params = new URLSearchParams();

        if (q) params.append("q", q);
        if (type) params.append("type", type);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return queryString ? `${ContactEP}?${queryString}` : ContactEP;
      },
      providesTags: ["contact"],
    }),

    getContactById: builder.query({
      query: (id) => `${ContactEP}/${id}`,
      providesTags: ["contact"],
    }),

    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ContactEP}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `${ContactEP}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
