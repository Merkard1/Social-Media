import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticleUpsertForm, getArticleUpsertForm] = buildSelector(
  (state: StateSchema) => state.articleUpsert?.form,
);
export const [useArticleUpsertIsLoading, getArticleUpsertIsLoading] = buildSelector(
  (state: StateSchema) => state.articleUpsert?.isLoading,
);
export const [useArticleUpsertError, getArticleUpsertError] = buildSelector(
  (state: StateSchema) => state.articleUpsert?.error,
);
export const [useArticleUpsertBlockImages, getArticleUpsertBlockImages] = buildSelector(
  (state: StateSchema) => state.articleUpsert?.blockImages || {},
);
