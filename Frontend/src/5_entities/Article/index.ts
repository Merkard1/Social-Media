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
export type { ArticleDetailsResponse } from "./model/types/article";

// Selectors
export {
  useArticlesDetailsData,
  getArticlesDetailsIsLoading,
  getArticlesDetailsError,
  getArticlesDetailsData,
} from "./model/selectors/articleDetailsSelectors/articleDetailsSelectors";
export {
  getArticleUpsertError,
  useArticleUpsertError,
  getArticleUpsertForm,
  useArticleUpsertForm,
  getArticleUpsertIsLoading,
  useArticleUpsertIsLoading,
  getArticleUpsertReadOnly,
  useArticleUpsertReadOnly,
} from "./model/selectors/articleUpsertSelectors/articlesUpsertSelectors";
export {
  useArticlesPageOrder,
  useArticlesPageSearch,
  useArticlesPageSort,
  useArticlesPageType,
  useArticlesPageView,
  getArticlesPageIsLoading,
  useArticlesPageError } from "./model/selectors/articlesPageSelectors/articlesPageSelectors";

// Slice
export { articleReducer } from "./model/slice";
export { articleUpsertActions } from "./model/slice/articleUpsertSlice";
export {
  articlesPageActions,
  articlesPageReducer,
  getArticles } from "./model/slice/articlesPageSlice";

// Services
export { fetchArticleData } from "./model/services/articleServices/fetchArticleData/fetchArticleData";
export { fetchArticlesList } from "./model/services/articlesPageServices/fetchArticlesList/fetchArticlesList";
export { fetchNextArticlesPage } from "./model/services/articlesPageServices/fetchNextArticlesPage/fetchNextArticlesPage";
export { initArticlesPage } from "./model/services/articlesPageServices/initArticlesPage/initArticlesPage";
export { saveArticleData } from "./model/services/articleUpsertServices/saveArticleData/saveArticleData";
export { updateArticleData } from "./model/services/articleUpsertServices/updateArticleData/updateArticleData";
export { fetchArticleById } from "./model/services/articleServices/fetchArticleById/fetchArticleById";

// Types
export type { ArticleSchema } from "./model/types";
export type { ArticleBlock } from "./model/types/article";
export type { ArticleUpsert } from "./model/types/articleUpsertSchema";

// UI
export { ArticleDetails } from "./ui/ArticleDetails/ArticleDetails";
export { ArticleList } from "./ui/ArticleList/ArticleList";
export { ArticleCodeBlockComponent } from "./ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";
export { renderArticleBlock } from "./ui/renderArticleBlock/renderArticleBlock";
