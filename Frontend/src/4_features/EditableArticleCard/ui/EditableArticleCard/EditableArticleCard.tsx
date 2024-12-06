import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  articleReducer,
  fetchArticleData,
  articleUpsertActions,
  useArticleUpsertReadOnly,
} from "@/5_entities/Article";

import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { VStack } from "@/6_shared/ui/Stack";

import { EditableArticleBlocks } from "../EditableArticleBlocks/EditableArticleBlocks";
import { EditableArticleCardFooter } from "../EditableArticleCardFooter/EditableArticleCardFooter";
import { EditableArticleCardHeader } from "../EditableArticleCardHeader/EditableArticleCardHeader";
import { EditableArticleTitle } from "../EditableArticleTitle/EditableArticleTitle";

interface ArticlePageProps {
  id?: string;
}

const reducers: ReducersList = {
  article: articleReducer,
};

export const EditableArticleCard = memo((props: ArticlePageProps) => {
  const { id } = props;
  const { t } = useTranslation("article");

  const dispatch = useAppDispatch();
  const readOnly = useArticleUpsertReadOnly();

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleData(id)).then((response) => {
        if (fetchArticleData.fulfilled.match(response)) {
          const article = response.payload;
          dispatch(articleUpsertActions.initializeArticleForm(article));
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
        <EditableArticleTitle readOnly={readOnly} />
        <EditableArticleBlocks readOnly={readOnly} />
        {!readOnly && <EditableArticleCardFooter />}
      </VStack>
    </DynamicModuleLoader>
  );
});
