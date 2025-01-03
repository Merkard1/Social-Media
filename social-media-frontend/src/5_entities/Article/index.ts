// API
export {
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useChangeArticleMutation,
  useDeleteArticleMutation,
  getAllArticles,
  getArticleById,
  createArticle,
  changeArticle,
  deleteArticle } from "./api/articleApi";

// lib
export { useArticlesPage } from "./lib/hooks/useArticlesPage";
export { useArticleFilters } from "./lib/hooks/useArticleFilters";

// MODEL
// Consts
export type { ArticleView, ArticleSortField, ArticleType } from "./model/consts/articleConsts";
export type { ArticleDetailsResponse } from "./model/types/Article";

// Selectors
export * from "./model/selectors/articleDetailsSelectors/articleDetailsSelectors";
export * from "./model/selectors/articleUpsertSelectors/articlesUpsertSelectors";
export * from "./model/selectors/articlesPageSelectors/articlesPageSelectors";

// Slice
export * from "./model/slice/articleDetailsSlice";
export * from "./model/slice/articleRecommendations";
export * from "./model/slice/articleUpsertSlice";
export * from "./model/slice/articlesPageSlice";

// Services
export { fetchArticleData } from "./model/services/articleServices/fetchArticleData/fetchArticleData";
export { fetchArticlesList } from "./model/services/articlesPageServices/fetchArticlesList/fetchArticlesList";
export { fetchNextArticlesPage } from "./model/services/articlesPageServices/fetchNextArticlesPage/fetchNextArticlesPage";
export { initArticlesPage } from "./model/services/articlesPageServices/initArticlesPage/initArticlesPage";
export { saveArticleData } from "./model/services/articleUpsertServices/saveArticleData/saveArticleData";
export { updateArticleData } from "./model/services/articleUpsertServices/updateArticleData/updateArticleData";
export { fetchArticleById } from "./model/services/articleServices/fetchArticleById/fetchArticleById";

// Types

export type { ArticleDetailsSchema } from "./model/types/ArticleDetailsSchema";
export type { ArticleRecommendationsSchema } from "./model/types/ArticleRecommendationsSchema";
export type { ArticleUpsertSchema } from "./model/types/ArticleUpsertSchema";
export type { ArticlesPageSchema } from "./model/types/ArticlesPageSchema";
export type { ArticleBlock } from "./model/types/Article";
export type { ArticleUpsert } from "./model/types/ArticleUpsertSchema";

// UI
export { ArticleDetails } from "./ui/ArticleDetails/ArticleDetails";
export { ArticleList } from "./ui/ArticleList/ArticleList";
export { ArticleCodeBlockComponent } from "./ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";
export { renderArticleBlock } from "./ui/renderArticleBlock/renderArticleBlock";
