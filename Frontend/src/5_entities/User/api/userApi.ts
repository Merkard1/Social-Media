import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";
import rtkApi from "@/6_shared/api/rtkApi";

import { JsonSettings } from "../model/types/jsonSettings";
import { User } from "../model/types/user";

interface UserInformation {
  registrationForm?: string;
  userId?: string;
  username?: string;
  jsonSettings: JsonSettings;
}

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<User, RegistrationForm>({
      query: (form) => ({
        url: getAPIUserEndpoint({ type: "users" }),
        method: "POST",
        body: form,
      }),
    }),

    getUserByUsername: build.query<User, string>({
      query: (username) => ({
        url: getAPIUserEndpoint({ type: "users", values: [username] }),
        method: "GET",
      }),
    }),

    setJsonSettings: build.mutation<User, UserInformation>({
      query: ({ userId, jsonSettings }) => ({
        url: getAPIUserEndpoint({ type: "users", values: [userId!] }),
        method: "PATCH",
        body: { jsonSettings },
      }),
    }),

    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: getAPIUserEndpoint({ type: "users/id", values: [userId] }),
        method: "GET",
      }),
    }),

    deleteUser: build.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: getAPIUserEndpoint({ type: "users", values: [userId] }),
        method: "DELETE",
      }),
    }),
  }),
});

export const registerUser = userApi.endpoints.registerUser.initiate;
export const getUserByUsername = userApi.endpoints.getUserByUsername.initiate;
export const setJsonSettings = userApi.endpoints.setJsonSettings.initiate;
export const getUserDataById = userApi.endpoints.getUserDataById.initiate;
export const deleteUser = userApi.endpoints.deleteUser.initiate;
