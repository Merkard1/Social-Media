/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import { action } from "@storybook/addon-actions";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import registration from "../services/registration/registration";
import { RegistrationSchema } from "../types/registrationSchema";

const initialState: RegistrationSchema = {
  isLoading: false,
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
};

const registrationSlice = buildSlice({
  name: "registration",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRepeatPassword: (state, action: PayloadAction<string>) => {
      state.repeatPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state) => {
        state.error = undefined;
        state.isLoading = false;
        // console.log(action.payload.accessToken);
        console.log(action);
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = typeof action.payload === "object" && action.payload?.message
          ? action.payload.message
          : "Unknown Error";
        state.isLoading = false;
      });
  },
});

export const {
  actions: registrationActions,
  reducer: registrationReducer,
  useActions: useRegistration } = registrationSlice;
