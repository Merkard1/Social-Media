/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_USER_ID } from "@/6_shared/const/localstorage";
import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { initAuthData } from "../services/initAuthData";
import { saveJsonSettings } from "../services/saveJsonSettings";
import { JsonSettings } from "../types/jsonSettings";
import { User, UserSchema } from "../types/user";

const initialState: UserSchema = {
  isLoading: false,
  error: undefined,
  _inited: false,
  access_token: "",
};

export const userSlice = buildSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ user: User; access_token?: string }>) => {
      state.authData = action.payload.user;
      if (action.payload.access_token) {
        state.access_token = action.payload.access_token;
      }
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_ID);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
    builder.addCase(initAuthData.fulfilled, (state, action) => {
      state.authData = action.payload;
      state._inited = true;
    });

    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUser } = userSlice;
