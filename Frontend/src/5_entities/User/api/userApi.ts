import rtkApi from "@/6_shared/api/rtkApi";

import { JsonSettings } from "../model/types/jsonSettings";
import { User } from "../model/types/user";

interface SetJsonSettingsParams {
  userId: string;
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
        url: "/users",
        method: "POST",
        body: form,
      }),
    }),

    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/id/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),

    updateUserJSONSettings: build.mutation<User, Omit<SetJsonSettingsParams, "userId">>({
      query: ({ jsonSettings }) => ({
        url: "/users",
        method: "PATCH",
        body: {
          jsonSettings,
        },
      }),
      invalidatesTags: (result, error) => [{ type: "User" }],
    }),

    deleteUser: build.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUpdateUserJSONSettingsMutation,
  useGetUserDataByIdQuery,
  useDeleteUserMutation,
} = userApi;

export const registerUser = userApi.endpoints.registerUser.initiate;
export const updateUserJSONSettings = userApi.endpoints.updateUserJSONSettings.initiate;
export const getUserDataById = userApi.endpoints.getUserDataById.initiate;
export const deleteUser = userApi.endpoints.deleteUser.initiate;
