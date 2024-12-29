import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { createArticle } from "@/5_entities/Article/api/articleApi";

import { getArticleUpsertBlockImages, getArticleUpsertForm } from "../../../selectors/articleUpsertSelectors/articlesUpsertSelectors";
import { ArticleDetailsResponse } from "../../../types/Article";

export const saveArticleData = createAsyncThunk<
  ArticleDetailsResponse,
  void,
  ThunkConfig<string[]>
>(
  "articleUpsert/saveArticleData",
  async (_, thunkApi) => {
    const { getState, dispatch, rejectWithValue } = thunkApi;
    const articleForm = getArticleUpsertForm(getState());
    const blockImages = getArticleUpsertBlockImages(getState());

    if (!articleForm) {
      return rejectWithValue(["No article data to save"]);
    }

    try {
      const formData = new FormData();
      formData.append("title", articleForm.title || "");
      formData.append("subtitle", articleForm.subtitle || "");
      formData.append("type", JSON.stringify(articleForm.type || []));
      formData.append("blocks", JSON.stringify(articleForm.blocks || []));

      if (articleForm.image instanceof File) {
        formData.append("image", articleForm.image);
      }

      articleForm.blocks?.forEach((block) => {
        if (block.type === "IMAGE" && block.src && block.src.startsWith("BLOCK_IMAGE_")) {
          const file = blockImages[block.src];
          if (file) {
            formData.append("blockImages", file);
          }
        }
      });

      const result = await dispatch(createArticle(formData)).unwrap();
      return result;
    } catch (error: any) {
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue(["Failed to save article data", error]);
    }
  },
);
