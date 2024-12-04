import { ArticleDetailsSchema } from "./articleDetailsSchema";
import { articleRecommendationsSchema } from "./articleRecommendationsSchema";
import { ArticlesPageSchema } from "./articlesPageSchema";
import { ArticleUpsertSchema } from "./articleUpsertSchema";

export interface ArticleSchema {
    articleRecommendations: articleRecommendationsSchema;
    articlesPage: ArticlesPageSchema;
    articleUpsert: ArticleUpsertSchema;
    articleDetails: ArticleDetailsSchema;
}
