import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticleForm, getArticleForm] = buildSelector(
  (state: StateSchema) => state.article?.articleUpsert.form,
);
export const [useArticleReadOnly, getArticleReadOnly] = buildSelector(
  (state: StateSchema) => state.article?.articleUpsert.readOnly,
);
export const [useArticleIsLoading, getArticleIsLoading] = buildSelector(
  (state: StateSchema) => state.article?.articleUpsert.isLoading,
);
export const [useArticleError, getArticleError] = buildSelector(
  (state: StateSchema) => state.article?.articleUpsert.error,
);
