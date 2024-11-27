import { rtkApi } from "@/6_shared/api/rtkApi";

import { AuthResponse, LoginForm, RegistrationForm } from "../model/types/auth";

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginByUsername: build.mutation<AuthResponse, LoginForm>({
      query: (authData) => ({
        url: "/auth/login",
        method: "POST",
        body: authData,
      }),
    }),

    registerUser: build.mutation<AuthResponse, RegistrationForm>({
      query: (registrationForm) => ({
        url: "/auth/registration",
        method: "POST",
        body: registrationForm,
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
  useRegisterUserMutation,
  useLogoutMutation,
} = authApi;

export const loginByUsername = authApi.endpoints.loginByUsername.initiate;
export const registerUser = authApi.endpoints.registerUser.initiate;
export const logout = authApi.endpoints.logout.initiate;
