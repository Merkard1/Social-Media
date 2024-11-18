import { StateSchema } from "@/1_app/providers/StoreProvider";

import { ArticleSortField, ArticleType, ArticleView } from "@/5_entities/Article";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticlesPageIsLoading, getArticlesPageIsLoading] = buildSelector((state: StateSchema) => state.articlesPage?.isLoading || false);
export const [useArticlesPageError, getArticlesPageError] = buildSelector((state: StateSchema) => state.articlesPage?.error);
export const [useArticlesPageView, getArticlesPageView] = buildSelector((state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL);
export const [useArticlesPageNum, getArticlesPageNum] = buildSelector((state: StateSchema) => state.articlesPage?.page || 1);
export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector((state: StateSchema) => state.articlesPage?.limit || 9);
export const [useArticlesPageHasMore, getArticlesPageHasMore] = buildSelector((state: StateSchema) => state.articlesPage?.hasMore);
export const [useArticlesPageInited, getArticlesPageInited] = buildSelector((state: StateSchema) => state.articlesPage?._inited);
export const [useArticlesPageSort, getArticlesPageSort] = buildSelector((state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED);
export const [useArticlesPageOrder, getArticlesPageOrder] = buildSelector((state: StateSchema) => state.articlesPage?.order ?? "asc");
export const [useArticlesPageSearch, getArticlesPageSearch] = buildSelector((state: StateSchema) => state.articlesPage?.search ?? "");
export const [useArticlesPageType, getArticlesPageType] = buildSelector((state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL);
