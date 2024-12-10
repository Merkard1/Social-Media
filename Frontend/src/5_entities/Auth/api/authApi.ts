import { rtkApi } from "@/6_shared/api/rtkApi";

import { AuthResponse, LoginForm } from "../model/types/auth";

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginByUsername: build.mutation<AuthResponse, LoginForm>({
      query: (authData) => ({
        url: "/auth/login",
        method: "POST",
        body: authData,
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginByUsernameMutation,
  useLogoutMutation,
} = authApi;

export const loginByUsername = authApi.endpoints.loginByUsername.initiate;
export const logout = authApi.endpoints.logout.initiate;
