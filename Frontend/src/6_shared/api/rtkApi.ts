import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LOCAL_STORAGE_USER } from "@/6_shared/const/localstorage";

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_USER) || "";
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
