import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { RatingCard, useGetAverageArticleRatingQuery, useHasUserRatedQuery, useRateArticleMutation } from "@/5_entities/Rating";
import { useUserAuthData } from "@/5_entities/User";

import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const userData = useUserAuthData();

  // Check if the user has rated the article
  const { data: hasUserRatedData,
    isLoading: isHasUserRatedLoading,
    error: hasUserRatedError } = useHasUserRatedQuery(articleId);

  // Get the average rating of the article
  const { data: averageRatingData,
    isLoading: isAverageRatingLoading,
    error: averageRatingError } = useGetAverageArticleRatingQuery(articleId);

  const [rateArticleMutation, {
    isLoading: isRateArticleLoading,
    error: rateArticleError }] = useRateArticleMutation();

  const handleRateArticle = useCallback(async (starsCount: number, feedback?: string) => {
    try {
      await rateArticleMutation({
        articleId,
        value: starsCount,
      }).unwrap(); // Using unwrap to handle fulfilled/rejected promises
      // Optionally, you can handle feedback if your backend supports it
    } catch (e) {
      console.error("Failed to rate the article:", e);
      // Optionally, display an error message to the user
    }
  }, [articleId, rateArticleMutation]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  }, [handleRateArticle]);

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount);
  }, [handleRateArticle]);

  if (isHasUserRatedLoading || isAverageRatingLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  if (hasUserRatedError || averageRatingError) {
    return <div>{t("An error occurred while fetching ratings.")}</div>;
  }

  const hasRated = hasUserRatedData?.hasRated;
  const userRating = hasUserRatedData?.articleRating;
  const averageRating = averageRatingData?.averageRating;

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={hasRated ? userRating : 0}
      className={className}
      title={t("Rating")}
      feedbackTitle={t("Leave feedback please to improve website quality")}
      hasFeedback={hasRated} // Show feedback only if user has rated
      averageRating={averageRating} // Pass average rating to display
    />
  );
});

export default ArticleRating;
