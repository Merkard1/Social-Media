import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticleIsLoading, getArticleIsLoading] = buildSelector(
  (state: StateSchema) => state.articlesPage?.isLoading,
);
export const [useArticlesPageIsLoading, getArticlesPageIsLoading] = buildSelector(
  (state: StateSchema) => state.articlesPage?.isLoading || false,
);
export const [useArticlesPageError, getArticlesPageError] = buildSelector(
  (state: StateSchema) => state.articlesPage?.error,
);
export const [useArticlesPageView, getArticlesPageView] = buildSelector(
  (state: StateSchema) => state.articlesPage?.view || "BIG",
);
export const [useArticlesPageNum, getArticlesPageNum] = buildSelector(
  (state: StateSchema) => state.articlesPage?.page || 1,
);
export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector(
  (state: StateSchema) => state.articlesPage?.limit || 9,
);
export const [useArticlesPageHasMore, getArticlesPageHasMore] = buildSelector(
  (state: StateSchema) => state.articlesPage?.hasMore,
);
export const [useArticlesPageInited, getArticlesPageInited] = buildSelector(
  (state: StateSchema) => state.articlesPage?._inited,
);
export const [useArticlesPageSort, getArticlesPageSort] = buildSelector(
  (state: StateSchema) => state.articlesPage?.sort ?? "createdAt",
);
export const [useArticlesPageOrder, getArticlesPageOrder] = buildSelector(
  (state: StateSchema) => state.articlesPage?.order ?? "asc",
);
export const [useArticlesPageSearch, getArticlesPageSearch] = buildSelector(
  (state: StateSchema) => state.articlesPage?.search ?? "",
);
export const [useArticlesPageType, getArticlesPageType] = buildSelector(
  (state: StateSchema) => state.articlesPage?.type ?? "ALL",
);
