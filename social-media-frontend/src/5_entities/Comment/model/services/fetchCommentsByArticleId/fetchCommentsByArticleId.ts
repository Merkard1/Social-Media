import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getAllCommentsForArticle } from "../../../api/commentApi";
import { Comment } from "../../types/comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string,
  ThunkConfig<string>
>(
  "articleDetails/fetchCommentsByArticleId",
  async (articleId, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    if (!articleId) {
      return rejectWithValue("Article ID is required");
    }

    try {
      const result = await dispatch(getAllCommentsForArticle(articleId)).unwrap();

      return result;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue("Failed to fetch comments");
    }
  },
);
