import { base_url } from "@/api/GlobalData";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: base_url,
  credentials: "include",
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const message = result.error.data?.message;

    console.log(`message`, message);
    if (status === 401) {
      toast.error("Session expired");
    }
  }

  return result;
};
