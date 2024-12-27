import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getArticleById } from "@/5_entities/Article/api/articleApi";

import { ArticleDetailsResponse } from "../../../types/Article";

export const fetchArticleById = createAsyncThunk<
  ArticleDetailsResponse,
  string,
  ThunkConfig<string>
>(
  "articleDetails/fetchArticleById",
  async (id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await dispatch(getArticleById({ id })).unwrap();

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (e) {
      return rejectWithValue("error");
    }
  },
);
