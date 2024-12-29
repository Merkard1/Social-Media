import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { deleteChatApi } from "../../../api/ChatApi";

export const deleteChat = createAsyncThunk<
  string,
  string,
  ThunkConfig<string>
>(
  "chat/deleteChat",
  async (chatId, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      await dispatch(deleteChatApi(chatId)).unwrap();

      return chatId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete chat");
    }
  },
);
