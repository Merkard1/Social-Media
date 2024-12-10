/* eslint-disable no-param-reassign */

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

const messageSlice = buildSlice({
  name: "messageSlice",
  initialState: null,
  reducers: {
  },
});

export const {
  actions: messageActions,
  reducer: messageReducer,
} = messageSlice;
