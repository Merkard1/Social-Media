/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { fetchAllUsersList } from "../services/fetchAllUsers";
import { UsersListSchema } from "../types/usersListSchema";

const initialState: UsersListSchema = {
  users: [],
  isLoading: false,
  error: null,
  query: "",
  page: 1,
  limit: 10,
};

const usersListSlice = buildSlice({
  name: "users",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
      state.users = [];
      state.error = null;
      state.isLoading = true;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    clearUsers(state) {
      state.users = [];
      state.page = 1;
      state.query = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersList.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.users = [...state.users, ...action.payload];
      })
      .addCase(fetchAllUsersList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  actions: usersListActions,
  reducer: usersListReducer,
  useActions: usersList } = usersListSlice;
