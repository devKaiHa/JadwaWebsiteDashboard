import { UploadsEP } from "../../Api/GlobalData";
import { baseApi } from "../baseApi";

export const uploadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: ({ folder, formData }) => ({
        url: `${UploadsEP}/image/${folder}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Uploads"],
    }),

    uploadDocument: builder.mutation({
      query: ({ folder, formData }) => ({
        url: `${UploadsEP}/doc/${folder}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Uploads"],
    }),
  }),
});

export const { useUploadImageMutation, useUploadDocumentMutation } = uploadsApi;
