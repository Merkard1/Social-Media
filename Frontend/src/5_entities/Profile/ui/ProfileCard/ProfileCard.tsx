import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { CountrySelect } from "@/5_entities/Country";
import { CurrencySelect } from "@/5_entities/Currency";

import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Card } from "@/6_shared/ui/Card/Card";
import ImageLoader from "@/6_shared/ui/ImageUploader/ui/ImageUploader";
import { Input } from "@/6_shared/ui/Input/Input";
import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { Profile } from "../../model/types/profile";

export interface ProfileCardProps {
  className?: string;
  data?: Profile | undefined | null;
  error?: string | undefined | null;
  isLoading?: boolean;
  readOnly?: boolean;
  onChangeFormField: any;
}

const ProfileCard = memo((props : ProfileCardProps) => {
  const {
    isLoading,
    error,
    className,
    data,
    readOnly,
    onChangeFormField,
  } = props;
  const { t } = useTranslation("profile");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = useCallback(
    async (imageFile: File) => {
      try {
        onChangeFormField("avatar", imageFile);
      } catch (error) {
        setUploadError(t("Image upload failed. Please try again."));
      } finally {
        setIsUploading(false);
      }
    },
    [onChangeFormField, t],
  );

  if (isLoading) {
    return (
      <Card padding="24" max>
        <VStack gap="32">
          <HStack max justify="center">
            <Skeleton border="100%" width={128} height={128} />
          </HStack>
          <HStack gap="32" max>
            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>

            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>
          </HStack>
          <Skeleton width="100%" height={180} />
        </VStack>
      </Card>);
  }

  if (error) {
    return (
      <Card max>
        <HStack max justify="center">
          <Text
            variant="error"
            title={t("There was an error loading your profile")}
            text={t("Try refreshing the page")}
            align="center"
          />
        </HStack>
      </Card>);
  }

  return (
    <Card padding="24" border="partial" max className={className}>
      <VStack gap="32">
        {data?.avatar && readOnly && (
          <HStack justify="center" max>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}
        {!readOnly
        && (
          <HStack justify="center" max>
            <ImageLoader
              src={data?.avatar instanceof File ? URL.createObjectURL(data.avatar) : data?.avatar}
              variant="round"
              label={t("Upload new Avatar")}
              onImageUpload={handleImageUpload}
            />
          </HStack>
        )}
        <HStack gap="24" max rowToColumn>
          <VStack gap="16" max>
            <Input
              value={data?.first}
              label={`${t("Name")}:`}
              onChange={(value: string) => onChangeFormField("first", value)}
              readOnly={readOnly}
            />
            <Input
              value={data?.lastname}
              label={`${t("Lastname")}:`}
              onChange={(value: string) => onChangeFormField("lastname", value)}
              readOnly={readOnly}
            />
            <Input
              value={data?.age !== undefined ? String(data.age) : ""}
              label={`${t("Age")}:`}
              onChange={(value) => {
                const numericValue = Number(value);
                if (!Number.isNaN(numericValue) && numericValue >= 0) {
                  onChangeFormField("age", numericValue);
                }
              }}
              readOnly={readOnly}
            />
          </VStack>
          <VStack gap="16" max>
            <CurrencySelect
              value={data?.currency}
              onChange={(value: string) => onChangeFormField("currency", value)}
              readonly={readOnly}
            />
            <CountrySelect
              value={data?.country}
              onChange={(value: string) => onChangeFormField("country", value)}
              readonly={readOnly}
            />
            <Input
              value={data?.city}
              label={`${t("City")}:`}
              onChange={(value: string) => onChangeFormField("city", value)}
              readOnly={readOnly}
            />
          </VStack>
        </HStack>

      </VStack>
    </Card>
  );
});

export default ProfileCard;
