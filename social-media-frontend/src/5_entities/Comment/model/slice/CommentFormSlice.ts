/* eslint-disable no-param-reassign */

import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { CommentFormSchema } from "../types/CommentFormSchema";

const initialState: CommentFormSchema = {
  readOnly: false,
  content: "",
};

const commentFormSlice = buildSlice({
  name: "commentFormSlice",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readOnly = action.payload;
    },
  },
});

export const {
  actions: commentFormActions,
  reducer: commentFormReducer,
  useActions: useCommentForm } = commentFormSlice;
