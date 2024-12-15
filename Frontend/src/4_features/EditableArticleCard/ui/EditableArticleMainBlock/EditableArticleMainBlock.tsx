import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  articleUpsertActions,
  useArticleUpsertForm,
  ArticleUpsert,
} from "@/5_entities/Article";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppImage } from "@/6_shared/ui/AppImage/AppImage";
import { Card } from "@/6_shared/ui/Card/Card";
import { ImageUploader } from "@/6_shared/ui/ImageUploader";
import { Input } from "@/6_shared/ui/Input/Input";
import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./EditableArticleMainBlock.module.scss";

interface EditableArticleMainBlockProps {
  readOnly?: boolean;
}

export const EditableArticleMainBlock = memo(({ readOnly }: EditableArticleMainBlockProps) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();

  const formData = useArticleUpsertForm();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onChange = useCallback(
    (field: keyof ArticleUpsert, value: any) => {
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

  const handleImageUpload = useCallback(
    async (imageFile: File) => {
      setIsUploading(true);
      setUploadError(null);

      try {
        onChange("image", imageFile);
      } catch (error) {
        setUploadError(t("Image upload failed. Please try again."));
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, t],
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
            <ImageUploader
              label={t("Drag & Drop a file or click to upload your article image")}
              onImageUpload={handleImageUpload}
              src={formData?.image instanceof File ? URL.createObjectURL(formData.image) : formData?.image}
            />
            {uploadError && <Text text={uploadError} variant="error" />}
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
        {formData?.image && typeof formData.image === "string" && (
          <AppImage
            fallback={<Skeleton width="100%" height={420} border="16px" />}
            className={cls.img}
            src={formData.image}
          />
        )}
      </VStack>
    </Card>
  );
});
