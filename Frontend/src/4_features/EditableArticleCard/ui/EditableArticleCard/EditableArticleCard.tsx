import { memo } from "react";
import { useTranslation } from "react-i18next";

import { articleReducer, fetchArticleData } from "@/5_entities/Article";
import { useArticleReadOnly } from "@/5_entities/Article/model/selectors/articleUpsertSelectors/articlesUpsertSelectors";
import { articleUpsertActions } from "@/5_entities/Article/model/slice/articleUpsertSlice";

import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "@/6_shared/ui/Stack";

import { EditableArticleBlocks } from "../EditableArticleBlocks/EditableArticleBlocks";
import { EditableArticleCardFooter } from "../EditableArticleCardFooter/EditableArticleCardFooter";
import { EditableArticleCardHeader } from "../EditableArticleCardHeader/EditableArticleCardHeader";

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
  const readOnly = useArticleReadOnly();

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchArticleData(id));
    } else {
      dispatch(articleUpsertActions.createNewArticle());
    }
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap="16" max>
        <EditableArticleCardHeader id={id || ""} />
        <EditableArticleBlocks readOnly={readOnly} />
        {!readOnly && <EditableArticleCardFooter />}
      </VStack>
    </DynamicModuleLoader>
  );
});
