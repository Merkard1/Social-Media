import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { changeArticle } from "../../../../api/articleApi";
import { getArticleUpsertBlockImages, getArticleUpsertForm } from "../../../selectors/articleUpsertSelectors/articlesUpsertSelectors";
import { ArticleDetailsResponse } from "../../../types/article";

export const updateArticleData = createAsyncThunk<
  ArticleDetailsResponse,
  string,
  ThunkConfig<any[]>
>(
  "article/updateArticleData",
  async (id, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const articleForm = getArticleUpsertForm(getState());
    const blockImages = getArticleUpsertBlockImages(getState());

    if (!articleForm) {
      return rejectWithValue(["No Data"]);
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

      const response = await dispatch(changeArticle({ id, formData })).unwrap();
      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue(["Server Error"]);
    }
  },
);
