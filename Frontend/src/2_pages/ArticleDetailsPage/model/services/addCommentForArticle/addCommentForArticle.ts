import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { getArticleDetailsData } from "@/5_entities/Article/model/selectors/articleDetails";
import { Comment, createCommentForArticle } from "@/5_entities/Comment";
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
      async (content, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !content || !article) {
          return rejectWithValue("no data");
        }

        try {
          const response = await dispatch(createCommentForArticle({ articleId: article.id, content })).unwrap();
          console.log(response);

          if (!response) {
            throw new Error();
          }

          dispatch(fetchCommentsByArticleId(article.id));

          return response;
        } catch (e) {
          return rejectWithValue("error");
        }
      },
    );
