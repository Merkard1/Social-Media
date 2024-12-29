import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { loginByUsername } from "@/5_entities/Auth";
import { User, userActions } from "@/5_entities/User";

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_USER_ID,
} from "@/6_shared/const/localstorage";
import { getRouteAbout } from "@/6_shared/const/router";

interface LoginByUsernamePayload {
  username: string;
  password: string;
}

const login = createAsyncThunk<
  User,
  LoginByUsernamePayload,
  ThunkConfig<{ message: string }>
>(
  "login/loginByUsername",
  async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
      const response = await dispatch(loginByUsername(authData)).unwrap();

      if (!response || !response.user || !response.accessToken) {
        throw new Error("Invalid response data");
      }

      const { user } = response;

      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(LOCAL_STORAGE_USER_ID, response.user.id);

      dispatch(userActions.setAuthData({ user }));

      if (extra.navigate) {
        extra.navigate(getRouteAbout());
      }

      return user;
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || "Server responded with an error";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue({ message: errorMessage });
    }
  },
);

export default login;
