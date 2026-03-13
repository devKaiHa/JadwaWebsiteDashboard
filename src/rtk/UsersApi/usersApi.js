import { UsersEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `${UsersEP}/me`,
      providesTags: ["Users"],
    }),

    updateMe: builder.mutation({
      query: (data) => ({
        url: `${UsersEP}/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation } = usersApi;
