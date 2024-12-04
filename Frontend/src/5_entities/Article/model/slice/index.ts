import { combineReducers } from "@reduxjs/toolkit";

import { ArticleSchema } from "../types";

import { articleDetailsReducer } from "./articleDetailsSlice";
import { articleRecommendationsReducer } from "./articleRecommendations";
import { articlesPageReducer } from "./articlesPageSlice";
import { articleUpsertReducer } from "./articleUpsertSlice";

export const articleReducer = combineReducers<ArticleSchema>({
  articleDetails: articleDetailsReducer,
  articleRecommendations: articleRecommendationsReducer,
  articlesPage: articlesPageReducer,
  articleUpsert: articleUpsertReducer,
});
