import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Comment } from "@/5_entities/Comment";

import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
    >(
      "articleDetails/fetchCommentsByArticleId",
      async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        if (!articleId) {
          return rejectWithValue("error");
        }

        try {
          const response = await extra.api.get<Comment[]>(
            getAPIUserEndpoint({ type: "article/comments", values: [articleId] }),
            {
            },
          );

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue("error");
        }
      },
    );
