import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getAllUsers } from "../../api/userApi";
import { getUsersListLimit, getUsersListPage } from "../selectors/UsersListSelectors/UsersListSelectors";
import { User } from "../types/user";

interface FetchUsersListProps {
  replace?: boolean;
  q: string;
}

export const fetchAllUsersList = createAsyncThunk<
  User[],
  FetchUsersListProps,
  ThunkConfig<string>
>(
  "usersPage/fetchAllUsersList",
  async ({ q, replace }, thunkApi) => {
    const { rejectWithValue, getState, extra, dispatch } = thunkApi;
    const { api } = extra;

    const page = getUsersListPage(getState());
    const limit = getUsersListLimit(getState());

    try {
      const response = await dispatch(getAllUsers({ q, page, limit })).unwrap();

      if (!response) {
        throw new Error("No data returned from API");
      }

      return response;
    } catch (e: any) {
      console.error("Error fetching users:", e);
      return rejectWithValue("error");
    }
  },
);
