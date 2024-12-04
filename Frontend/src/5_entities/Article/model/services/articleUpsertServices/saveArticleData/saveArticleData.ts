import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { createArticle } from "../../../../api/articleApi";
import { ArticleDetailsResponse } from "../../../types/article";

export const saveArticleData = createAsyncThunk<
  ArticleDetailsResponse,
  void,
  ThunkConfig<string[]>
>(
  "articleUpsert/saveArticleData",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const articleForm = state.article?.articleUpsert?.form;

    if (!articleForm) {
      return rejectWithValue(["No article data to save"]);
    }

    try {
      const result = await dispatch(createArticle(articleForm)).unwrap();
      return result;
    } catch (error: any) {
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue(["Failed to save article data"]);
    }
  },
);
