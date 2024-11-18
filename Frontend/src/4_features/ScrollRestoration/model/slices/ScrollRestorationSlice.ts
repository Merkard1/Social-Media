/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { ScrollRestoration } from "../types/ScrollRestoration";

const initialState: ScrollRestoration = {
  scroll: {},
};

const scrollRestorationSlice = buildSlice({
  name: "scrollRestoration",
  initialState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{path: string, position: number}>) {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const {
  actions: scrollRestorationActions,
  reducer: scrollRestorationReducer,
  useActions: useScrollRestoration } = scrollRestorationSlice;
