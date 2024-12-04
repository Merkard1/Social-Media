import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { changeArticle } from "../../../../api/articleApi";
import { ArticleType } from "../../../consts/articleConsts";
import { getArticlesDetailsData } from "../../../selectors/articleDetailsSelectors/articleDetailsSelectors";
import { getArticleForm } from "../../../selectors/articleUpsertSelectors/articlesUpsertSelectors";
import { ArticleUpdateInput } from "../../../types/article";
import { ArticleUpsert } from "../../../types/articleUpsertSchema";

export const updateArticleData = createAsyncThunk<
ArticleUpsert,
    any,
    ThunkConfig<any[]>
    >(
      "profile/updateProfileData",
      async (id, thunkApi) => {
        const { rejectWithValue, getState, dispatch } = thunkApi;

        const articleForm = getArticleForm(getState());
        const articleData = getArticlesDetailsData(getState());

        if (!articleData || !articleForm) {
          return rejectWithValue(["No Data"]);
        }

        try {
          const updatedArticleData: Partial<ArticleUpdateInput> = {
            ...articleData,
            ...articleForm,
            type: (articleForm.type as ArticleType[]),
          };

          const response = await dispatch(
            changeArticle({ id, articleData: updatedArticleData }),
          ).unwrap();

          if (!response) {
            throw new Error();
          }

          return response;
        } catch (e) {
          console.log(e);
          return rejectWithValue(["Server Error"]);
        }
      },
    );
