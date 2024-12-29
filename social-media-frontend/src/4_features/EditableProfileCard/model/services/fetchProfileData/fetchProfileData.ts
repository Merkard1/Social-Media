import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getProfile, Profile } from "@/5_entities/Profile";

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
    >(
      "profile/fetchProfileData",
      async (username, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
          const response = await dispatch(getProfile({ username })).unwrap();

          if (!response) {
            throw new Error("No profile data returned from API");
          }

          return response;
        } catch (e) {
          console.log(e);
          return rejectWithValue("error");
        }
      },
    );
