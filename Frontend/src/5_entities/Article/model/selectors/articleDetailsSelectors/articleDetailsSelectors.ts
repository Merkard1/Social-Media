import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticlesDetailsData, getArticlesDetailsData] = buildSelector(
  (state: StateSchema) => state.article?.articleDetails.data,
);
export const [useArticlesDetailsIsLoading, getArticlesDetailsIsLoading] = buildSelector(
  (state: StateSchema) => state.article?.articleDetails.isLoading || false,
);
export const [useArticlesDetailesError, getArticlesDetailsError] = buildSelector(
  (state: StateSchema) => state.article?.articleDetails.error,
);
