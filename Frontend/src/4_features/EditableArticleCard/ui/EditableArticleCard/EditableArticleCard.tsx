import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  fetchArticleData,
  articleUpsertActions,
  ArticleUpsert,
  articleUpsertReducer } from "@/5_entities/Article";

import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { VStack } from "@/6_shared/ui/Stack";

import { EditableArticleBlocks } from "../EditableArticleBlocks/EditableArticleBlocks";
import { EditableArticleCardFooter } from "../EditableArticleCardFooter/EditableArticleCardFooter";
import { EditableArticleCardHeader } from "../EditableArticleCardHeader/EditableArticleCardHeader";
import { EditableArticleMainBlock } from "../EditableArticleMainBlock/EditableArticleMainBlock";

interface ArticlePageProps {
  id?: string;
}

const reducers: ReducersList = {
  articleUpsert: articleUpsertReducer,
};

export const EditableArticleCard = memo((props: ArticlePageProps) => {
  const { id } = props;
  const { t } = useTranslation("article");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleData(id)).then((response) => {
        if (fetchArticleData.fulfilled.match(response)) {
          const article = response.payload;

          const upsertArticle: ArticleUpsert = {
            id: article.id,
            title: article.title,
            subtitle: article.subtitle,
            image: article.image || null,
            type: article.type,
            blocks: article.blocks,
            user: article.user,
            views: article.views,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
          };

          dispatch(articleUpsertActions.initializeArticleForm(upsertArticle));
        } else {
          console.error("Failed to fetch article data");
        }
      });
    } else {
      dispatch(articleUpsertActions.createNewArticle());
    }
  }, [id, dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap="16" max>
        <EditableArticleCardHeader id={id || ""} />
        <EditableArticleMainBlock />
        <EditableArticleBlocks />
        <EditableArticleCardFooter />
      </VStack>
    </DynamicModuleLoader>
  );
});
