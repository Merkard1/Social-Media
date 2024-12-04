import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { ArticleBlock, articleUpsertActions } from "@/5_entities/Article";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { ListBox } from "@/6_shared/ui/Popups";
import { HStack } from "@/6_shared/ui/Stack";

import { createArticleBlock } from "../../model/utils/createArticleBlock";

interface EditableArticleCardFooterProps {}

export const EditableArticleCardFooter = memo(
  (props: EditableArticleCardFooterProps) => {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();

    const [selectedBlockType, setSelectedBlockType] = useState<ArticleBlock["type"]>("TEXT");

    const itemsType = [
      { value: "TEXT", content: t("Text") },
      { value: "CODE", content: t("Code") },
      { value: "IMAGE", content: t("Image") },
    ];

    const handleBlockTypeChange = useCallback((value: ArticleBlock["type"]) => {
      setSelectedBlockType(value);
    }, []);

    const handleAddBlock = useCallback(() => {
      const newBlock = createArticleBlock(selectedBlockType);
      dispatch(articleUpsertActions.addArticleBlock(newBlock));
    }, [dispatch, selectedBlockType]);

    return (
      <Card max padding="24">
        <HStack max justify="end" gap="24">
          <ListBox
            items={itemsType}
            value={selectedBlockType}
            onChange={handleBlockTypeChange}
            direction="top left"
          />
          <Button color="success" onClick={handleAddBlock}>
            {t("Add new block")}
          </Button>
        </HStack>
      </Card>
    );
  },
);
