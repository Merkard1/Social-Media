/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { saveArticleData } from "../services/articleUpsertServices/saveArticleData/saveArticleData";
import { updateArticleData } from "../services/articleUpsertServices/updateArticleData/updateArticleData";
import { ArticleBlock } from "../types/article";
import { ArticleUpsert, ArticleUpsertSchema } from "../types/articleUpsertSchema";

const initialState: ArticleUpsertSchema = {
  readOnly: false,
  isLoading: false,
  error: undefined,
  validateErrors: undefined,
  form: null,
  initialData: null,
};

export const articleUpsertSlice = buildSlice({
  name: "articleUpsert",
  initialState,
  reducers: {
    // Create new Article
    createNewArticle: (state) => {
      const emptyArticle: ArticleUpsert = {
        id: "",
        title: "",
        subtitle: "",
        img: "",
        type: [],
        blocks: [],
        user: null,
        views: 0,
        createdAt: "",
        updatedAt: "",
      };
      state.form = emptyArticle;
      state.initialData = emptyArticle;
      state.readOnly = false;
    },
    // Initialize article form
    initializeArticleForm: (state, action: PayloadAction<ArticleUpsert>) => {
      state.form = { ...action.payload };
      state.initialData = { ...action.payload };
      state.readOnly = true;
    },
    // Change readonly
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readOnly = action.payload;
    },
    // Cancel edit
    cancelEdit: (state) => {
      state.readOnly = true;
      state.validateErrors = undefined;
      if (state.initialData) {
        state.form = { ...state.initialData };
      }
    },
    // Update article field
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
    // Update article block
    updateArticleBlock: (
      state,
      action: PayloadAction<{ blockId: string; updatedBlock: Partial<Omit<ArticleBlock, "type">> }>,
    ) => {
      if (state.form) {
        const { blockId, updatedBlock } = action.payload;
        state.form.blocks = state.form.blocks.map((block) =>
          (block.id === blockId ? { ...block, ...updatedBlock } : block));
      }
    },
    // Add article block
    addArticleBlock: (state, action: PayloadAction<ArticleBlock>) => {
      if (state.form && state.form.blocks) {
        state.form.blocks.push(action.payload);
      }
    },
    // Delete article block
    deleteArticleBlock: (state, action: PayloadAction<string>) => {
      if (state.form && state.form.blocks) {
        state.form.blocks = state.form.blocks.filter((block) => block.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Creating article
      .addCase(saveArticleData.pending, (state) => {
        state.isLoading = true;
        state.validateErrors = undefined;
      })
      .addCase(
        saveArticleData.fulfilled,
        (state, action: PayloadAction<ArticleUpsert>) => {
          state.isLoading = false;
          state.form = { ...action.payload };
          state.initialData = { ...action.payload };
          state.readOnly = true;
        },
      )
      .addCase(saveArticleData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload as string[];
      })
      // Updating article data
      .addCase(updateArticleData.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(
        updateArticleData.fulfilled,
        (state, action: PayloadAction<ArticleUpsert>) => {
          state.isLoading = false;
          state.form = { ...action.payload };
          state.initialData = { ...action.payload };
          state.readOnly = true;
          state.validateErrors = undefined;
        },
      )
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
