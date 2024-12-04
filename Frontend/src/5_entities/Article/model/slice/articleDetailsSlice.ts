/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { fetchArticleData } from "../services/articleServices/fetchArticleData/fetchArticleData";
import { ArticleDetailsResponse } from "../types/article";
import { ArticleDetailsSchema } from "../types/articleDetailsSchema";

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: null,
};

export const articleDetailsSlice = buildSlice({
  name: "articleDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Getting article data
      .addCase(fetchArticleData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleData.fulfilled, (
        state,
        action: PayloadAction<ArticleDetailsResponse>,
      ) => {
        state.isLoading = false;
        state.data = JSON.parse(JSON.stringify(action.payload));
      })
      .addCase(fetchArticleData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: articleDetailsReducer,
} = articleDetailsSlice;
