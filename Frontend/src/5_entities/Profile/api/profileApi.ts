import rtkApi from "@/6_shared/api/rtkApi";

import { Profile } from "../model/types/profile";

interface GetProfileParams {
  username: string;
}

interface ChangeProfileParams {
  username: string;
  formData: Partial<Profile>;
}

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({

    getProfile: build.query<Profile, GetProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}`,
        method: "GET",
      }),
      providesTags: (result, error, { username }) => [
        { type: "Profile", id: username },
      ],
    }),

    changeProfile: build.mutation<Profile, ChangeProfileParams>({
      query: ({ username, formData }) => ({
        url: `/profiles/${username}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { username }) => [
        { type: "Profile", id: username },
      ],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useChangeProfileMutation,
} = profileApi;

export const getProfile = profileApi.endpoints.getProfile.initiate;
export const changeProfile = profileApi.endpoints.changeProfile.initiate;
