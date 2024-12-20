/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { ConversationSchema, Message } from "../types/ConversationSchema";

const initialState: ConversationSchema = {
  messages: [],
  currentMessage: "",
  isLoading: false,
  error: null,
};

const conversationSlice = buildSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCurrentMessage(state, action: PayloadAction<string>) {
      state.currentMessage = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    updateMessage(state, action: PayloadAction<Message>) {
      const index = state.messages.findIndex((msg) => msg.id === action.payload.id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    },

    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
      state.currentMessage = "";
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  actions: conversationActions,
  reducer: conversationReducer,
  useActions: useConversation } = conversationSlice;
