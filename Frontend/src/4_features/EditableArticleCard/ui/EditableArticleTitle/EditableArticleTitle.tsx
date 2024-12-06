import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  articleUpsertActions,
  useArticleUpsertForm, ArticleUpsert } from "@/5_entities/Article";
import { ImageLoader } from "@/5_entities/ImageLoader";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppImage } from "@/6_shared/ui/AppImage/AppImage";
import { Card } from "@/6_shared/ui/Card/Card";
import { Input } from "@/6_shared/ui/Input/Input";
import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./EditableArticleTitle.module.scss";

interface EditableArticleTitleProps {
  readOnly?: boolean;
}

export const EditableArticleTitle = memo(
  ({ readOnly }: EditableArticleTitleProps) => {
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();

    const formData = useArticleUpsertForm();

    const onChange = useCallback(
      (field: keyof ArticleUpsert, value: string) => {
        dispatch(articleUpsertActions.updateArticleField({ field, value }));
      },
      [dispatch],
    );

    const handleInputChange = useCallback(
      (field: keyof ArticleUpsert) => (value: string) => {
        onChange(field, value);
      },
      [onChange],
    );

    if (!readOnly) {
      return (
        <Card max padding="16">
          <Card max variant="light">
            <VStack gap="8">
              <Input
                value={formData?.title}
                label={`${t("Title")}:`}
                onChange={handleInputChange("title")}
                placeholder={t("Enter title")}
              />
              <Input
                value={formData?.subtitle}
                label={`${t("Subtitle")}:`}
                onChange={handleInputChange("subtitle")}
                placeholder={t("Enter subtitle")}
              />
              {formData?.img ? (
                // TODO image loader
                <AppImage
                  onClick={() => {}}
                  fallback={
                    <Skeleton
                      width="100%"
                      height={420}
                      border="16px"
                    />
                  }
                  className={cls.img}
                  src={formData?.img}
                />) : (<ImageLoader onImageUpload={() => {}} />)}

            </VStack>
          </Card>
        </Card>
      );
    }

    return (
      <Card padding="16" max border="partial">
        <VStack gap="8">
          <HStack max justify="between">
            <Text title={formData?.title} text={formData?.subtitle} />
          </HStack>
          <AppImage
            fallback={
              <Skeleton
                width="100%"
                height={420}
                border="16px"
              />
            }
            className={cls.img}
            src={formData?.img}
          />
        </VStack>
      </Card>
    );
  },
);
