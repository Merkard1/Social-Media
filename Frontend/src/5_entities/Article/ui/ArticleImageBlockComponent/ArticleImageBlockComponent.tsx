/* eslint-disable no-nested-ternary */
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { ImageUploader } from "@/6_shared/ui/ImageUploader";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { getArticleUpsertBlockImages } from "../../model/selectors/articleUpsertSelectors/articlesUpsertSelectors";
import { ArticleImageBlock } from "../../model/types/Article";

interface ArticleImageBlockComponentProps {
  block: ArticleImageBlock;
  readOnly?: boolean;
  onChange?: (blockId: string, updatedBlock: Partial<ArticleImageBlock>) => void;
  onDelete?: (blockId: string) => void;
  onImageUpload?: (blockId: string, file: File) => void;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { block, readOnly, onChange, onDelete = () => {}, onImageUpload = () => {} } = props;
  const { t } = useTranslation();
  const blockImages = useSelector(getArticleUpsertBlockImages);

  const handleTitleChange = useCallback(
    (value: string) => {
      onChange?.(block.id, { title: value });
    },
    [block.id, onChange],
  );

  const handleImageUpload = useCallback(
    (file: File) => {
      onImageUpload?.(block.id, file);
    },
    [block.id, onImageUpload],
  );

  const handleDeleteBlock = useCallback(() => {
    onDelete?.(block.id);
  }, [block.id, onDelete]);

  const imageSrc = useMemo(() => {
    if (block.src?.startsWith("BLOCK_IMAGE_")) {
      const file = blockImages[block.src];
      if (file) {
        return URL.createObjectURL(file);
      }
      return "";
    }
    return block.src || "";
  }, [block.src, blockImages]);

  if (!readOnly) {
    return (
      <Card max variant="light">
        <VStack gap="16">
          <HStack gap="16" justify="between" max>
            <Text text={`${t("Image Block")}:`} />
            <Button color="error" onClick={handleDeleteBlock}>
              {t("Delete Block")}
            </Button>
          </HStack>
          <ImageUploader
            label={t("Upload article image")}
            onImageUpload={handleImageUpload}
            src={imageSrc || undefined}
          />
          <Input
            value={block.title}
            label={`${t("Title")}:`}
            onChange={handleTitleChange}
          />
        </VStack>
      </Card>
    );
  }

  return (
    <VStack max gap="16">
      {block.src?.startsWith("BLOCK_IMAGE_") ? (
        !imageSrc ? (
          <Text text={t("Image is uploading...")} />
        ) : (
          <img src={imageSrc} alt={block.title} />
        )
      ) : (
        block.src && <img src={block.src} alt={block.title} />
      )}
      {block.title && <Text text={block.title} align="center" />}
    </VStack>
  );
});
