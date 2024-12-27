import { ArticleDetailsResponse } from "./Article";

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data: ArticleDetailsResponse | null;
}
