import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";
import rtkApi from "@/6_shared/api/rtkApi";

import { JsonSettings } from "../model/types/jsonSettings";
import { User } from "../model/types/user";

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: ({ userId, jsonSettings }) => ({
        url: getAPIUserEndpoint({ type: "users/id", value: userId }),
        method: "PATCH",
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: getAPIUserEndpoint({ type: "id", value: userId }),
        method: "GET",
      }),
    }),
  }),
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
