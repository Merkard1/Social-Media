/* eslint-disable no-param-reassign */

import { PayloadAction } from "@reduxjs/toolkit";

import { Message } from "@/5_entities/Message";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { createChat } from "../services/createChat/createChat";
import { deleteChat } from "../services/deleteChat/deleteChat";
import { fetchChatList } from "../services/fetchChatList/fetchChatList";
import { fetchMessages } from "../services/fetchMessages/fetchMessages";
import { Chat, ChatSchema } from "../types/ChatSchema";

const initialState: ChatSchema = {
  chats: [],
  selectedChat: null,
  isLoading: false,
  error: undefined,
};

const chatSlice = buildSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    addChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    setSelectedChat(state, action: PayloadAction<Chat | null>) {
      state.selectedChat = action.payload;
    },
    clearSelectedChat(state) {
      state.selectedChat = null;
    },
    updateChat(state, action: PayloadAction<Chat>) {
      const index = state.chats.findIndex((chat) => chat.id === action.payload.id);
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
      if (state.selectedChat && state.selectedChat.id === action.payload.id) {
        state.selectedChat = action.payload;
      }
    },
    removeChat(state, action: PayloadAction<string>) {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
      if (state.selectedChat?.id === action.payload) {
        state.selectedChat = null;
      }
    },
    addMessageToChat(
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        const exists = chat.messages.some((msg) => msg.id === message.id);
        if (!exists) {
          chat.messages.push(message);
          if (state.selectedChat && state.selectedChat.id === chatId) {
            state.selectedChat = { ...chat };
          }
        }
      }
    },
    setMessagesForChat(state, action: PayloadAction<{ chatId: string; messages: Message[] }>) {
      const { chatId, messages } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages = messages;
        if (state.selectedChat && state.selectedChat.id === chatId) {
          state.selectedChat = { ...chat };
        }
      }
    },
    clearMessagesForChat(state, action: PayloadAction<string>) {
      const chatId = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages = [];
        if (state.selectedChat && state.selectedChat.id === chatId) {
          state.selectedChat = { ...chat };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action: PayloadAction<Chat>) => {
        state.error = undefined;
        state.isLoading = false;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteChat.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteChat.fulfilled, (state, action: PayloadAction<string>) => {
        state.error = undefined;
        state.isLoading = false;
        state.chats = state.chats.filter((chat) => chat.id !== action.payload);
        if (state.selectedChat?.id === action.payload) {
          state.selectedChat = null;
        }
      })
      .addCase(deleteChat.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchChatList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchChatList.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.error = undefined;
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChatList.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.error = undefined;
        state.isLoading = false;
        if (state.selectedChat) {
          state.selectedChat.messages = action.payload;
        }
      })
      .addCase(fetchMessages.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  actions: chatActions,
  reducer: chatReducer,
  useActions: usechat,
} = chatSlice;
