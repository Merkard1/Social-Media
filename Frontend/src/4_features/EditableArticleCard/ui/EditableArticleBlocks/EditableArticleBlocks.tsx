import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { articleUpsertActions, useArticleUpsertForm } from "@/5_entities/Article";
import { ArticleBlock, UpdatedBlock } from "@/5_entities/Article/model/types/Article";
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
  const formData = useArticleUpsertForm();

  const onChangeBlockField = useCallback(
    (blockId: string, updatedBlock: UpdatedBlock) => {
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

  const onImageUpload = useCallback(
    (blockId: string, file: File) => {
      const blockIndex = formData!.blocks.findIndex((b: ArticleBlock) => b.id === blockId);
      const placeholder = `BLOCK_IMAGE_${blockIndex}`;
      dispatch(articleUpsertActions.updateArticleBlock({
        blockId,
        updatedBlock: { src: placeholder },
      }));
      dispatch(articleUpsertActions.updateBlockImage({ placeholder, file }));
    },
    [dispatch, formData],
  );

  if (!formData || !formData?.blocks?.length) return null;

  return (
    <Card padding="16" max>
      <VStack gap="16" max>
        {formData.blocks.map((block: ArticleBlock) =>
          renderArticleBlock({
            block,
            readOnly,
            onChange: onChangeBlockField,
            onDelete,
            onImageUpload,
          }))}
      </VStack>
    </Card>
  );
});
