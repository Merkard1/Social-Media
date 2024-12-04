import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { articleUpsertActions, useArticleForm } from "@/5_entities/Article";
import { ArticleBlock } from "@/5_entities/Article/model/types/article";
import { renderArticleBlock } from "@/5_entities/Article/ui/renderArticleBlock/renderArticleBlock";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/6_shared/ui/Card/Card";
import { VStack } from "@/6_shared/ui/Stack";

interface EditableArticleBlocksProps {
  readOnly?: boolean;
}

export const EditableArticleBlocks = memo((props: EditableArticleBlocksProps) => {
  const { readOnly = false } = props;
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const formData = useArticleForm();

  const onChangeBlockField = useCallback(
    (blockId: string, updatedBlock: Partial<ArticleBlock>) => {
      dispatch(articleUpsertActions.updateArticleBlock({ blockId, updatedBlock }));
    },
    [dispatch],
  );

  const onDelete = useCallback(
    (blockId: string) => {
      dispatch(articleUpsertActions.deleteArticleBlock(blockId));
    },
    [dispatch],
  );

  if (!formData) { return null; }

  return (
    <Card padding="16" max>
      <VStack gap="16" max>
        {/* TODO */}
        {formData.blocks.map((block: any) =>
          renderArticleBlock({
            block,
            readOnly,
            onChange: onChangeBlockField,
            onDelete,
          }))}
      </VStack>
    </Card>
  );
});
