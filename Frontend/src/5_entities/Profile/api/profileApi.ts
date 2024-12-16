import rtkApi from "@/6_shared/api/rtkApi";

import { Profile } from "../model/types/profile";

interface GetProfileParams {
  username: string;
}

interface ChangeProfileParams {
  username: string;
  profileData: Partial<Profile>;
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
      query: ({ username, profileData }) => {
        const formData = new FormData();

        if (profileData.first) formData.append("first", profileData.first);
        if (profileData.lastname) formData.append("lastname", profileData.lastname);
        if (typeof profileData.age !== "undefined") formData.append("age", String(profileData.age));
        if (profileData.currency) formData.append("currency", profileData.currency);
        if (profileData.country) formData.append("country", profileData.country);
        if (profileData.city) formData.append("city", profileData.city);

        if (profileData.avatar) {
          formData.append("avatar", profileData.avatar);
        }

        return {
          url: `/profiles/${username}`,
          method: "PATCH",
          body: formData,
        };
      },
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
