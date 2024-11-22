import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_LAST_DESIGN_KEY, LOCAL_STORAGE_USER_ID } from "@/6_shared/const/localstorage";

import { getUserDataByIdQuery } from "../../api/userApi";
import { User } from "../types/user";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  "user/initAuthData",
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

    if (!userId || !accessToken) {
      return rejectWithValue("No user ID or access token found in localStorage");
    }

    try {
      const response = await dispatch(
        getUserDataByIdQuery(userId),
      ).unwrap();

      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        response.features?.isAppRedesigned ? "new" : "old",
      );

      return response;
    } catch (e) {
      console.error("Error initializing auth data:", e);
      return rejectWithValue("Failed to initialize auth data");
    }
  },
);
