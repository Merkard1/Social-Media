import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { registerUser, User, userActions } from "@/5_entities/User";

import { getRouteAbout } from "@/6_shared/const/router";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const registration = createAsyncThunk<
  User,
  RegistrationData,
  ThunkConfig<{ message: string }>
>(
  "registration/register",
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const user: User = await dispatch(registerUser(authData)).unwrap();

      if (!user) {
        throw new Error("Registration failed: No response data received");
      }

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

export default registration;
