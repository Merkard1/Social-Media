import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";
import rtkApi from "@/6_shared/api/rtkApi";

import { Profile } from "../model/types/profile";

interface ProfileInformation {
  username: string;
}

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.mutation<Profile, ProfileInformation>({
      query: ({ username }) => ({
        url: getAPIUserEndpoint({ type: "profiles", values: [username] }),
        method: "GET",
      }),
    }),
    changeProfile: build.mutation<Profile, ProfileInformation>({
      query: ({ username }) => ({
        url: getAPIUserEndpoint({ type: "profiles", values: [username] }),
        method: "PATCH",
        body: {

        },
      }),
    }),
  }),
});

export const getProfile = profileApi.endpoints.getProfile.initiate;
export const changeProfile = profileApi.endpoints.getProfile.initiate;
