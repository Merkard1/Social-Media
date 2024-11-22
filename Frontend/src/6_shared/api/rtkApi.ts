import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LOCAL_STORAGE_ACCESS_TOKEN } from "@/6_shared/const/localstorage";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: __API__,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) || "";
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      console.error("API Error:", result.error);
      // TODO addd token refresh logic
    }
    return result;
  },
  tagTypes: ["User", "Post", "Comment"],
  endpoints: (builder) => ({
  }),
});

export default rtkApi;
