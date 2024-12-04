import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ImageLoader } from "@/5_entities/ImageLoader";

import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { ArticleImageBlock } from "../../model/types/article";

import cls from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
    readOnly?: boolean;
    onChange?: any;
    onDelete?: (blockId: string) => void,
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block, readOnly, onChange, onDelete = () => {} } = props;
  const { t } = useTranslation();

  const handleTitleChange = useCallback((value: string) => {
    if (onChange) {
      onChange(block.id, { title: value });
    }
  }, [block.id, onChange]);

  const handleImageUpload = useCallback((imgSrc: string) => {
    if (onChange) {
      onChange(block.id, { src: imgSrc });
    }
  }, [block.id, onChange]);

  const handleDeleteBlock = useCallback(() => {
    if (onDelete) {
      onDelete(block.id);
    }
  }, [block.id, onDelete]);

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
          <ImageLoader label={t("Upload article image")} onImageUpload={handleImageUpload} />
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
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && (
        <Text text={block.title} align="center" />
      )}
    </VStack>
  );
});
