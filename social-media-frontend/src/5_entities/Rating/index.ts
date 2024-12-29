export type { Rating } from "./model/types/types";
export { RatingCard } from "./ui/RatingCard/RatingCard";

export {
  useRateArticleMutation,
  useGetAverageArticleRatingQuery,
  useHasUserRatedQuery,
  rateArticle,
  getAverageArticleRating,
  hasUserRated,
} from "./api/ratingApi";
