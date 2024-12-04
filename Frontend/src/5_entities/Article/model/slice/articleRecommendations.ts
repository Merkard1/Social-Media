/* eslint-disable no-param-reassign */
import { createEntityAdapter } from "@reduxjs/toolkit";

import { fetchArticleRecommendations } from "@/5_entities/Comment/model/services/fetchArticleRecommendations/fetchArticleRecommendations";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { articleRecommendationsSchema } from "../types/articleRecommendationsSchema";

const recommendationsAdapter = createEntityAdapter<any>({
  selectId: (article) => article.id,
});

// export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
//   (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
// );

const articleRecommendationsSlice = buildSlice({
  name: "articleRecommendationsSlice",
  initialState: recommendationsAdapter.getInitialState<articleRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (
        state,
        action,
      ) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  actions: articleRecommendationsActions,
  reducer: articleRecommendationsReducer,
} = articleRecommendationsSlice;

// TODO FIX
