import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { User, userActions } from "@/5_entities/User";

import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_USER_ID } from "@/6_shared/const/localstorage";

interface LoginByUserName {
  username: string;
  password: string;
}

const loginByUsername = createAsyncThunk<
  User,
  LoginByUserName,
  ThunkConfig<{ message: string }>
>(
  "login/loginByUsername",
  async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.post("auth/login", authData);

      if (!response.data) {
        throw new Error("No response data");
      }

      const { accessToken, user } = response.data;

      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_USER_ID, response.data.user.id);

      dispatch(userActions.setAuthData({
        ...user,
        token: accessToken,
      }));

      if (extra.navigate) {
        extra.navigate("/about");
      }

      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || "Server responded with an error";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue({ message: errorMessage });
    }
  },
);

export default loginByUsername;
