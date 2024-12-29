/* eslint-disable no-param-reassign */

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Message } from "@/5_entities/Message";

import { fetchMessagesApi } from "../../../api/ChatApi";

interface FetchMessagesProps {
  chatId: string;
}

export const fetchMessages = createAsyncThunk<
  Message[],
  FetchMessagesProps,
  ThunkConfig<string>
>(
  "chat/fetchMessages",
  async ({ chatId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await dispatch(fetchMessagesApi(chatId)).unwrap();

      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch messages");
    }
  },
);
