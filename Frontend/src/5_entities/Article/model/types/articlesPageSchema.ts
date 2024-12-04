import { EntityState } from "@reduxjs/toolkit";

import { SortOrder } from "@/6_shared/types/sort";

import { ArticleSortField, ArticleType, ArticleView } from "../consts/articleConsts";

import { ArticleDetailsResponse } from "./article";

export interface ArticlesPageSchema extends EntityState<ArticleDetailsResponse> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;

}
