import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { LOCAL_STORAGE_LAST_DESIGN_KEY, LOCAL_STORAGE_USER } from "@/6_shared/const/localstorage";

import { getUserDataByIdQuery } from "../../api/userApi";
import { User } from "../types/user";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  "user/initAuthData",
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(LOCAL_STORAGE_USER);

    if (!userId) {
      return rejectWithValue("");
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
      console.log(e);
      return rejectWithValue("");
    }
  },
);
