import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ArticleList,
  getArticles,
  getArticlesPageIsLoading,
  useArticlesPageView,
  useArticlesPageError } from "@/5_entities/Article";

import { Text } from "@/6_shared/ui/Text/Text";

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useArticlesPageView();
  const error = useArticlesPageError();
  const { t } = useTranslation();

  if (error) {
    return <Text text={t("Error while loading an article")} />;
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
});
