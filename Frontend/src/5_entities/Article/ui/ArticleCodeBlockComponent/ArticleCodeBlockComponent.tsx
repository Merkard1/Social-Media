import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Code } from "@/6_shared/ui/Code/Code";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { ArticleCodeBlock } from "../../model/types/article";

import cls from "./ArticleCodeBlockComponent.module.scss";

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
    readOnly?: boolean;
    onChange?: (blockId: string, updatedBlock: Partial<ArticleCodeBlock>) => void;
    onDelete?: (blockId: string) => void,
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
  const { className, block, readOnly, onChange, onDelete = () => {} } = props;
  const { t } = useTranslation();

  const handleCodeChange = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(block.id, { code: value });
      }
    },
    [block.id, onChange],
  );

  const handleDeleteBlock = useCallback(() => {
    if (onDelete) {
      onDelete(block.id);
    }
  }, [block.id, onDelete]);

  if (!readOnly) {
    return (
      <Card max variant="light">
        <VStack gap="8">
          <HStack justify="between" max>
            <Text text={`${t("Code Block")}:`} />
            <Button color="error" onClick={handleDeleteBlock}>
              {t("Delete Block")}
            </Button>
          </HStack>
          <Input
            value={block.code}
            label={`${t("Code")}:`}
            onChange={handleCodeChange}
          />
        </VStack>
      </Card>
    );
  }

  return (
    <HStack gap="16" max>
      <VStack gap="16" max>
        <Code text={block.code} className={cls.Code} />
      </VStack>
    </HStack>
  );
});
