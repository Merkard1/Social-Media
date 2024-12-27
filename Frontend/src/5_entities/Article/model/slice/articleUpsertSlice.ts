/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { saveArticleData } from "../services/articleUpsertServices/saveArticleData/saveArticleData";
import { updateArticleData } from "../services/articleUpsertServices/updateArticleData/updateArticleData";
import { ArticleBlock, ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock, UpdatedBlock } from "../types/Article";
import { ArticleUpsert, ArticleUpsertSchema } from "../types/ArticleUpsertSchema";

const initialState: ArticleUpsertSchema = {
  isLoading: false,
  error: undefined,
  validateErrors: undefined,
  form: null,
  initialData: null,
  blockImages: {},
};

export const articleUpsertSlice = buildSlice({
  name: "articleUpsert",
  initialState,
  reducers: {
    /*
    / Create new Article
    */
    createNewArticle: (state) => {
      const emptyArticle: ArticleUpsert = {
        id: "",
        title: "",
        subtitle: "",
        image: null,
        type: [],
        blocks: [],
        user: null,
        views: 0,
        createdAt: "",
        updatedAt: "",
      };
      state.form = emptyArticle;
      state.initialData = emptyArticle;
    },
    initializeArticleForm: (state, action: PayloadAction<ArticleUpsert>) => {
      state.form = { ...action.payload };
      state.initialData = { ...action.payload };
    },
    /*
    / Cancel edit
    */
    cancelEdit: (state) => {
      state.validateErrors = undefined;
      if (state.initialData) {
        state.form = { ...state.initialData };
      }
    },
    /*
    / Update Article field
    */
    updateArticleField: (
      state,
      action: PayloadAction<{ field: keyof ArticleUpsert; value: any }>,
    ) => {
      if (state.form) {
        state.form = {
          ...state.form,
          [action.payload.field]: action.payload.value,
        };
      }
    },
    /*
    / Update Article block
    */
    updateArticleBlock: (
      state,
      action: PayloadAction<{ blockId: string; updatedBlock: UpdatedBlock }>,
    ) => {
      if (state.form) {
        const { blockId, updatedBlock } = action.payload;

        state.form.blocks = state.form.blocks.map((block) => {
          if (block.id !== blockId) return block;

          switch (block.type) {
          case "CODE":
            return { ...block, ...(updatedBlock as Partial<ArticleCodeBlock>) };
          case "IMAGE":
            return { ...block, ...(updatedBlock as Partial<ArticleImageBlock>) };
          case "TEXT":
            return { ...block, ...(updatedBlock as Partial<ArticleTextBlock>) };
          default:
            return block;
          }
        });
      }
    },
    /*
    / Add Article block
    */
    addArticleBlock: (state, action: PayloadAction<ArticleBlock>) => {
      if (state.form && state.form.blocks) {
        state.form.blocks.push(action.payload);
      }
    },
    /*
    / Update Article block image
    */
    updateBlockImage: (
      state,
      action: PayloadAction<{ placeholder: string; file: File }>,
    ) => {
      state.blockImages[action.payload.placeholder] = action.payload.file;
    },
    /*
    / Delete Article block
    */
    deleteArticleBlock: (state, action: PayloadAction<string>) => {
      if (state.form && state.form.blocks) {
        state.form.blocks = state.form.blocks.filter((block) => block.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveArticleData.pending, (state) => {
        state.isLoading = true;
        state.validateErrors = undefined;
      })
      .addCase(saveArticleData.fulfilled, (state, action: PayloadAction<ArticleUpsert>) => {
        state.isLoading = false;
        state.form = { ...action.payload };
        state.initialData = { ...action.payload };
      })
      .addCase(saveArticleData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload as string[];
      })
      .addCase(updateArticleData.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(updateArticleData.fulfilled, (state, action: PayloadAction<ArticleUpsert>) => {
        state.isLoading = false;
        state.form = { ...action.payload };
        state.initialData = { ...action.payload };
        state.validateErrors = undefined;
      })
      .addCase(updateArticleData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload as string[];
      });
  },
});

export const {
  actions: articleUpsertActions,
  reducer: articleUpsertReducer,
} = articleUpsertSlice;
