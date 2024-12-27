import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { createChatApi } from "../../../api/ChatApi";
import { Chat } from "../../types/ChatSchema";

interface CreateChatProps {
  recipientId: string;
}

export const createChat = createAsyncThunk<
  Chat,
  CreateChatProps,
  ThunkConfig<string>
>(
  "chat/createChat",
  async ({ recipientId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await dispatch(createChatApi({ recipientId })).unwrap();

      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create chat");
    }
  },
);
