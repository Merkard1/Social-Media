import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getArticleUpsertReadOnly, useArticlesDetailsData } from "@/5_entities/Article";

import { getRouteArticles } from "@/6_shared/const/router";
import { Button } from "@/6_shared/ui/Button/Button";
import { HStack } from "@/6_shared/ui/Stack";

interface ArticleDetailsPageHeaderProps {
 className?: string
}

const ArticleDetailsPageHeader = ({ className } : ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // TODO mb error
  const canEdit = useSelector(getArticleUpsertReadOnly);
  const article = useArticlesDetailsData();

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEdit = useCallback(() => {
    if (article) {
      navigate(getRouteArticles());
    }
  }, [navigate, article]);

  return (
    <HStack justify="between" max>
      <Button variant="outline" onClick={onBackToList}>
        {t("Back")}
      </Button>
      {canEdit && (
        <Button variant="outline" onClick={onEdit}>
          {t("Edit")}
        </Button>
      )}
    </HStack>
  );
};

export default ArticleDetailsPageHeader;
