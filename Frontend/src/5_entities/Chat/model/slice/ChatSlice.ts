/* eslint-disable no-param-reassign */

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

const chatSlice = buildSlice({
  name: "chatSlice",
  initialState: null,
  reducers: {
  },
});

export const {
  actions: chatActions,
  reducer: chatReducer,
  useActions: useChat } = chatSlice;
