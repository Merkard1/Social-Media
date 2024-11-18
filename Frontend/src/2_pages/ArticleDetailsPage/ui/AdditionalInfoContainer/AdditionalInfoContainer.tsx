import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRouteArticleEdit } from "@/1_app/config/routeConfig/routeConfig";

import { ArticleAdditionalInfo } from "@/3_widgets/ArticleAdditionalInfo";

import { getArticleDetailsData } from "@/5_entities/Article";

import { Card } from "@/6_shared/ui/Card/Card";

import cls from "./AdditionalInfoContainer.module.scss";

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" border="partial" className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
