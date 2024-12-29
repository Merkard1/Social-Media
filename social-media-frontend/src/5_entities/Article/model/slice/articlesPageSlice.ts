/* eslint-disable no-param-reassign */
import { createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";

import { StateSchema } from "@/1_app/providers/StoreProvider";

import { LOCAL_STORAGE_ARTICLES_VIEW } from "@/6_shared/const/localstorage";
import { buildSlice } from "@/6_shared/lib/store/buildSlice";
import { SortOrder } from "@/6_shared/types/sort";

import { ArticleSortField, ArticleType, ArticleView } from "../consts/articleConsts";
import { fetchArticlesList } from "../services/articlesPageServices/fetchArticlesList/fetchArticlesList";
import { ArticleDetailsResponse } from "../types/Article";
import { ArticlesPageSchema } from "../types/ArticlesPageSchema";

const articlesAdapter = createEntityAdapter<ArticleDetailsResponse>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState: ArticlesPageSchema = articlesAdapter.getInitialState({
  isLoading: false,
  error: undefined,
  view: "SMALL",
  page: 1,
  limit: 8,
  hasMore: true,
  sort: "createdAt",
  order: "asc",
  search: "",
  type: "ALL",
  _inited: false,
});

const articlesPageSlice = buildSlice({
  name: "articlesPage",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(LOCAL_STORAGE_ARTICLES_VIEW, action.payload);
      state.limit = action.payload === "BIG" ? 4 : 12;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(LOCAL_STORAGE_ARTICLES_VIEW) as ArticleView;
      if (view) {
        state.view = view;
        state.limit = view === "BIG" ? 4 : 12;
      }
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg?.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length >= (state.limit ?? 8);

        if (action.meta.arg?.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred while fetching articles.";
      });
  },
});

export const {
  reducer: articlesPageReducer,
  actions: articlesPageActions,
} = articlesPageSlice;
