/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import loginByUsername from "../services/loginByUsername/loginByUserName";
import { LoginSchema } from "../types/loginSchema";

const initialState: LoginSchema = {
  isLoading: false,
  username: "",
  password: "",
};

const loginSlice = buildSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.error = undefined;
        state.isLoading = false;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.error = typeof action.payload === "object" && action.payload?.message
          ? action.payload.message
          : "Unknown Error";
        state.isLoading = false;
      });
  },
});

export const {
  actions: loginActions,
  reducer: loginReducer,
  useActions: useLogin } = loginSlice;
