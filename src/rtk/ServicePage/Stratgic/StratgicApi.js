import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { StratgicEndPoint } from "../../../Api/GlobalData";
import Cookies from "js-cookie";

// import Cookies from "js-cookie";
const jwt = Cookies.get("Token");
export const StratgicApi = createApi({
  reducerPath: "StratgicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
      return headers;
    },
  }),
  tagTypes: ["Stratgic"],
  endpoints: (builder) => ({
    // getAllHmeSliders: builder.query({
    //   query: () => HomeSliderEndPoint,
    //   providesTags: ["AboutService"],
    // }),

    getOneStratgicService: builder.query({
      query: () => `${StratgicEndPoint}/one`,
      providesTags: ["Stratgic"],
    }),

    updateStratgicService: builder.mutation({
      query: ({ payload }) => ({
        url: `${StratgicEndPoint}/one`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Stratgic"],
    }),

    // deleteEmployee: builder.mutation({
    //   query: (id) => ({
    //     url: `${StratgicEndPoint}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["AboutService"],
    // }),
  }),
});

export const {
  useGetOneStratgicServiceQuery,
  useUpdateStratgicServiceMutation,
} = StratgicApi;
