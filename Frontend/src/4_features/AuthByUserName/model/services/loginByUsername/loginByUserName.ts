import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { User, userActions } from "@/5_entities/User";

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
      const response = await extra.api.post<User>("/login", authData);

      if (!response.data) {
        throw new Error("No response data");
      }

      dispatch(userActions.setAuthData(response.data));

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
