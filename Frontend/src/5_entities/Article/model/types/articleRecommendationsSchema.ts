import { EntityState } from "@reduxjs/toolkit";

import { ArticleDetailsResponse } from "@/5_entities/Article";

export interface articleRecommendationsSchema extends EntityState<ArticleDetailsResponse> {
  isLoading?: boolean;
    error?: string;
}
