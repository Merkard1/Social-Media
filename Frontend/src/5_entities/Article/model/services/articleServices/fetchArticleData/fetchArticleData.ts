import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getArticleById } from "../../../../api/articleApi";
import { ArticleDetailsResponse } from "../../../types/article";

export const fetchArticleData = createAsyncThunk<
  ArticleDetailsResponse,
  string,
  ThunkConfig<string>
    >(
      "article/fetchProfileData",
      async (id, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
          const response = await dispatch(getArticleById({ id })).unwrap();

          if (!response) {
            throw new Error("No article data returned from API");
          }

          return response;
        } catch (e) {
          console.log(e);
          return rejectWithValue("error");
        }
      },
    );
