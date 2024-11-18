import { EntityState } from "@reduxjs/toolkit";

import { Article } from "@/5_entities/Article";

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;
}
