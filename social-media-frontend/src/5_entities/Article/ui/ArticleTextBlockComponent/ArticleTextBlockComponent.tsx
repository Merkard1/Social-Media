import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { ArticleTextBlock } from "../../model/types/Article";

import cls from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
    readOnly?: boolean;
    onChange?: any;
    onDelete?: (blockId: string) => void,
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block, readOnly, onChange, onDelete = () => {} } = props;
    const { t } = useTranslation();

    const handleTitleChange = useCallback(
      (value: string) => {
        if (onChange) {
          onChange(block.id, { title: value });
        }
      },
      [block.id, onChange],
    );

    const handleParagraphChange = useCallback(
      (index: number, value: string) => {
        if (onChange) {
          const updatedParagraphs = [...block.paragraphs];
          updatedParagraphs[index] = value;
          onChange(block.id, { paragraphs: updatedParagraphs });
        }
      },
      [block.id, block.paragraphs, onChange],
    );

    const handleAddParagraph = useCallback(() => {
      if (onChange) {
        onChange(block.id, { paragraphs: [...block.paragraphs, ""] });
      }
    }, [block.id, block.paragraphs, onChange]);

    const handleDeleteParagraph = useCallback(
      (index: number) => {
        if (onChange) {
          const updatedParagraphs = block.paragraphs.filter((_, i) => i !== index);
          onChange(block.id, { paragraphs: updatedParagraphs });
        }
      },
      [block.id, block.paragraphs, onChange],
    );

    const handleDeleteBlock = useCallback(() => {
      if (onDelete) {
        onDelete(block.id);
      }
    }, [block.id, onDelete]);

    if (!readOnly) {
      return (
        <Card variant="light" max padding="8">
          <VStack max gap="16">
            <HStack max justify="between">
              <Text text={`${t("Text block")}:`} />
              <Button color="error" onClick={handleDeleteBlock}>
                {t("Delete Block")}
              </Button>
            </HStack>
            <Input
              value={block.title}
              label={`${t("Title")}:`}
              onChange={handleTitleChange}
            />
            {block.paragraphs.map((paragraph, idx) => (
              <VStack key={idx} gap="8" max>
                <HStack max gap="16">
                  <Text title={`${t("Paragraph")} ${idx + 1}:`} size="s" max />
                  <Input
                    value={paragraph}
                    onChange={(value) => handleParagraphChange(idx, value)}
                  />
                </HStack>
                <HStack max justify="start">
                  <Button
                    color="error"
                    onClick={() => handleDeleteParagraph(idx)}
                  >
                    {t("Delete Paragraph")}
                  </Button>
                </HStack>
              </VStack>
            ))}
            <HStack justify="end" max>
              <Button
                color="success"
                onClick={handleAddParagraph}
              >
                {t("Add Paragraph")}
              </Button>
            </HStack>
          </VStack>
        </Card>);
    }

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [
          className,
        ])}
      >
        {block.title && (
          <Text title={block.title} className={cls.title} />
        )}
        {block.paragraphs.map((paragraph, index) => (
          <Text
            key={paragraph}
            text={paragraph}
            className={cls.paragraph}
          />
        ))}
      </div>
    );
  },
);
