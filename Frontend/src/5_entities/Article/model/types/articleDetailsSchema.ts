import { ArticleDetailsResponse } from "./article";

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data: ArticleDetailsResponse | null;
}
