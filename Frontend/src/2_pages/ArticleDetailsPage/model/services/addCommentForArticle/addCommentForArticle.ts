import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getArticleDetailsData } from "@/5_entities/Article/model/selectors/articleDetails";
import { Comment } from "@/5_entities/Comment";
import { getUserAuthData } from "@/5_entities/User";

import {
  fetchCommentsByArticleId,
} from "../../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
    >(
      "articleDetails/addCommentForArticle",
      async (text, thunkApi) => {
        const {
          extra, dispatch, rejectWithValue, getState,
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
          return rejectWithValue("no data");
        }

        try {
          const response = await extra.api.post<Comment>("/comments", {
            articleId: article.id,
            userId: userData.id,
            text,
          });

          if (!response.data) {
            throw new Error();
          }

          dispatch(fetchCommentsByArticleId(article.id));

          return response.data;
        } catch (e) {
          return rejectWithValue("error");
        }
      },
    );
