import { memo } from "react";
import { useTranslation } from "react-i18next";

import { User } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Button } from "@/6_shared/ui/Button/Button";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./ArticleAdditionalInfo.module.scss";

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();

    return (
      <VStack
        gap="32"
        className={classNames(cls.ArticleAdditionalInfo, {}, [
          className,
        ])}
      >
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        <Button onClick={onEdit}>{t("Edit")}</Button>
        <Text text={t("{{count}} просмотров", { count: views })} />
      </VStack>
    );
  },
);
