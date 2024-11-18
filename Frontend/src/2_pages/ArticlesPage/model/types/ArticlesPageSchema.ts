import { EntityState } from "@reduxjs/toolkit";

import { Article, ArticleView, ArticleSortField, ArticleType } from "@/5_entities/Article";

import { SortOrder } from "@/6_shared/types/sort";

export interface ArticlesPageSchema extends EntityState<Article> {
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
