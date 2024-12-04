import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticleIsLoading, getArticleIsLoading] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.isLoading,
);
export const [useArticlesPageIsLoading, getArticlesPageIsLoading] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.isLoading || false,
);
export const [useArticlesPageError, getArticlesPageError] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.error,
);
export const [useArticlesPageView, getArticlesPageView] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.view || "BIG",
);
export const [useArticlesPageNum, getArticlesPageNum] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.page || 1,
);
export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.limit || 9,
);
export const [useArticlesPageHasMore, getArticlesPageHasMore] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.hasMore,
);
export const [useArticlesPageInited, getArticlesPageInited] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?._inited,
);
export const [useArticlesPageSort, getArticlesPageSort] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.sort ?? "createdAt",
);
export const [useArticlesPageOrder, getArticlesPageOrder] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.order ?? "asc",
);
export const [useArticlesPageSearch, getArticlesPageSearch] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.search ?? "",
);
export const [useArticlesPageType, getArticlesPageType] = buildSelector(
  (state: StateSchema) => state.article?.articlesPage?.type ?? "ALL",
);
