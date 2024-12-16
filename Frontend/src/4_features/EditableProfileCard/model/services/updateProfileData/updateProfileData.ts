import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { changeProfile, Profile } from "@/5_entities/Profile";
import { getUserAuthData } from "@/5_entities/User";

import { ValidateProfileError } from "../../consts/consts";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<ValidateProfileError[]>
    >(
      "profile/updateProfileData",
      async (username, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const profileData = getProfileForm(getState());
        const userData = getUserAuthData(getState());

        const errors = validateProfileData(profileData);

        if (errors.length) {
          return rejectWithValue(errors);
        }

        if (!userData || !profileData) {
          return rejectWithValue([ValidateProfileError.NO_DATA]);
        }

        try {
          const response = await dispatch(
            changeProfile({ username, profileData }),
          ).unwrap();

          if (!response) {
            throw new Error();
          }

          return response;
        } catch (e) {
          console.log(e);
          return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
      },
    );
