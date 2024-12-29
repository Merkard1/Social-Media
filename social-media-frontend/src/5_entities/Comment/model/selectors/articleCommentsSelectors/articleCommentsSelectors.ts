import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: StateSchema) => state.comment?.articleComments.isLoading;

export const getArticleCommentsError = (state: StateSchema) => state.comment?.articleComments.error;
