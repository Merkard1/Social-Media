import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Article } from "@/5_entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
    >(
      "articleDetailsPage/fetchArticleRecommendations",
      async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        // TODO add recommandations
        try {
          const response = await extra.api.get<Article[]>("/articles", {
            params: {
              _limit: 4,
            },
          });

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue("error");
        }
      },
    );
