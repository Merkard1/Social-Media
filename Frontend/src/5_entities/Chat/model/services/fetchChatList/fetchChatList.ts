import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { fetchChatsApi } from "../../../api/ChatApi";
import { Chat } from "../../types/ChatSchema";

export const fetchChatList = createAsyncThunk<
  Chat[],
  void,
  ThunkConfig<string>
>(
  "chat/fetchChatList",
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await dispatch(fetchChatsApi()).unwrap();

      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch chat list");
    }
  },
);
