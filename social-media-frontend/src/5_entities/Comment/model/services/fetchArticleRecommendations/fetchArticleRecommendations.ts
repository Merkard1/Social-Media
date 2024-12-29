import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

export const fetchArticleRecommendations = createAsyncThunk<
any[],
    void,
    ThunkConfig<string>
    >(
      "articleDetailsPage/fetchArticleRecommendations",
      async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        // TODO FIX types all back (
        try {
          const response = await extra.api.get<any[]>("/articles", {
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
