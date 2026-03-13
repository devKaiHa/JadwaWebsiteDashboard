import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "blog",
    "BlogCateory",
    "Company",
    "contact",
    "Funds",
    "Jobs",
    "News",
    "NewsCategories",
    "Newsletters",
    "Projects",
    "Researches",
    "Sectors",
    "Settings",
    "Uploads",
    "Users",
  ],
  endpoints: () => ({}),
});
