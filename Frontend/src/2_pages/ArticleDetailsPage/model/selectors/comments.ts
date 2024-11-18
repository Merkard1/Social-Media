import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useArticleCommentsIsLoading, getArticleCommentsIsLoading] = buildSelector((state: StateSchema) => state.articleDetailsPage?.comments?.isLoading);

export const [useArticleCommentsError, getArticleCommentsError] = buildSelector((state: StateSchema) => state.articleDetailsPage?.comments?.error);
