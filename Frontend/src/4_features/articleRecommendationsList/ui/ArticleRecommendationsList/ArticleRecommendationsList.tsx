import { memo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleList } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { useArticlesRecommendationList } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { isLoading, data } = useArticlesRecommendationList(3);

  if (isLoading) {
    return null;
  }

  return (
    <VStack gap="8" data-testid="ArticleRecommendationsList" className={classNames("", {}, [className])}>
      <Text title={t("Recomendations")} size="l" />
      <ArticleList
        articles={data}
        isLoading={isLoading}
      />
    </VStack>
  );
});

// TODO story
