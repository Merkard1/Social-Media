import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticleDetailsData, getArticleDetailsData] = buildSelector((state: StateSchema) => state.articleDetails?.data);
export const [useArticleDetailsIsLoading, getArticleDetailsIsLoading] = buildSelector((state: StateSchema) => state.articleDetails?.isLoading || false);
export const [useArticleDetailesError, getArticleDetailsError] = buildSelector((state: StateSchema) => state.articleDetails?.error);
