import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Profile } from "@/5_entities/Profile";

import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
    >(
      "profile/fetchProfileData",
      async (username, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const response = await extra.api.get<Profile>(getAPIUserEndpoint({ type: "username", value: username }));

          if (!response.data) {
            throw new Error("No profile data returned from API");
          }

          return response.data;
        } catch (e) {
          console.log(e);
          return rejectWithValue("error");
        }
      },
    );
