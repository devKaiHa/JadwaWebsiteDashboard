import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import baseURL from "../Api/GlobalData";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const message = result.error.data?.message;

    if (status === 401) {
      toast.error("Session expired");
    }
  }

  return result;
};
