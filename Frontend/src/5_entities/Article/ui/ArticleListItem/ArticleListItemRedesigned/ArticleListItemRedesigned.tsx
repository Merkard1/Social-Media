import { memo } from "react";
import { useTranslation } from "react-i18next";

import { getRouteArticleDetails } from "@/1_app/config/routeConfig/routeConfig";

import EyeIcon from "@/6_shared/assets/icons/eye.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppImage } from "@/6_shared/ui/AppImage/AppImage";
import { AppLink } from "@/6_shared/ui/AppLink/AppLink";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import {
  ArticleBlockType,
  ArticleView,
} from "../../../model/consts/articleConsts";
import { ArticleTextBlock } from "../../../model/types/article";
import { ArticleListItemProps } from "../ArticleListItem";

import cls from "./ArticleListItemRedesigned.module.scss";

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const userInfo = article && article.user ? (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.username} />
    </>
  ) : null;

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article?.views || 0)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article?.blocks?.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    // Big ArticlesList View
    return (
      <Card
        padding="24"
        max
        data-testid="ArticleListItem"
        className={classNames(cls.ArticleListItem, {}, [
          className,
          cls[view],
        ])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            {userInfo}
            <Text text={article?.createdAt || ""} />
          </HStack>
          <Text title={article?.title || ""} bold />
          <Text title={article?.subtitle || ""} size="s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article?.img || ""}
            className={cls.img}
            alt={article?.title || ""}
          />
          {textBlock?.paragraphs && (
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
            />
          )}
          <HStack max justify="between">
            <AppLink
              target={target}
              to={getRouteArticleDetails(article?.id || "")}
            >
              <Button variant="outline">
                {t("Read more...")}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  // Small ArticlesList View
  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article?.id || "")}
      className={classNames(cls.ArticleListItem, {}, [
        className,
        cls[view],
      ])}
    >
      <Card className={cls.card} border="partial" padding="0">
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          alt={article?.title || ""}
          src={article?.img || ""}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article?.title || ""} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text
                text={article?.createdAt || ""}
                className={cls.date}
              />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
