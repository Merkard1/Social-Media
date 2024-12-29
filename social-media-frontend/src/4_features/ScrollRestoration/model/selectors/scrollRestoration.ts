import { createSelector } from "@reduxjs/toolkit";

import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getScrollPosition = (state: StateSchema) => state.scrollRestoration.scroll;

export const getScrollByPath = createSelector(
  getScrollPosition,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
