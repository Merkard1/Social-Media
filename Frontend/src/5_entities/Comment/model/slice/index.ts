import { combineReducers } from "@reduxjs/toolkit";

import { CommentSchema } from "../types";

import { articleCommentsReducer } from "./articleCommentsSlice";
import { commentFormReducer } from "./CommentFormSlice";

export const commentReducer = combineReducers<CommentSchema>({
  commentForm: commentFormReducer,
  articleComments: articleCommentsReducer,
});
