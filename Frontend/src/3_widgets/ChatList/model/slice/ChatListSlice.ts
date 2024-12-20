/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { Chat, ChatListSchema } from "../types/ChatListSchema";

const initialState: ChatListSchema = {
  chats: [],
  selectedChatId: null,
  isLoading: false,
  error: null,
};

const chatListSlice = buildSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    selectChat(state, action: PayloadAction<string>) {
      state.selectedChatId = action.payload;
    },
    updateChat(state, action: PayloadAction<Chat>) {
      const index = state.chats.findIndex((chat) => chat.id === action.payload.id);
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  actions: chatListActions,
  reducer: chatListReducer,
  useActions: useChatList } = chatListSlice;
