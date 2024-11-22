import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Profile } from "@/5_entities/Profile";
import { getUserAuthData } from "@/5_entities/User";

import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";

import { ValidateProfileError } from "../../consts/consts";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
    >(
      "profile/updateProfileData",
      async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const formData = getProfileForm(getState());
        const userData = getUserAuthData(getState());

        const errors = validateProfileData(formData);

        if (errors.length) {
          return rejectWithValue(errors);
        }

        if (!userData) {
          return rejectWithValue([ValidateProfileError.NO_DATA]);
        }

        try {
          const response = await extra.api.patch<Profile>(
            getAPIUserEndpoint({ type: "username", value: userData?.username }),
            formData,
          );

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          console.log(e);
          return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
      },
    );
