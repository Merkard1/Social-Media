import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import EyeIcon from "@/6_shared/assets/icons/eye.svg";
import { getRouteArticleDetails } from "@/6_shared/const/router";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { formatDateToCustom } from "@/6_shared/lib/dateFormat/dateFormat";
import useMediaQuery from "@/6_shared/lib/hooks/useMedia/useMedia";
import { AppImage } from "@/6_shared/ui/AppImage/AppImage";
import { AppLink } from "@/6_shared/ui/AppLink/AppLink";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { ArticleView } from "../../model/consts/articleConsts";
import { Article, ArticleTextBlock } from "../../model/types/article";

import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const isBelowLargeScreen = useMediaQuery("(max-width: 1200px)");
  const { t } = useTranslation();
  const { title, createdAt, img, id, subtitle, blocks } = article;

  const userInfo = (
    <>
      <Avatar
        size={32}
        src={article.user.profile?.avatar}
        className={cls.avatar}
      />
      <Text bold text={article.user.username} />
    </>
  );
  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === "BIG") {
    const textBlock = blocks.find(
      (block) => block.type === "TEXT",
    ) as ArticleTextBlock;

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
            <Text text={formatDateToCustom(createdAt)} />
          </HStack>
          <Text title={title} bold />
          <Text title={subtitle} size="s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={img}
            className={cls.img}
            alt={title}
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
              to={getRouteArticleDetails(id)}
            >
              <Button variant="outline">
                {t("Читать далее...")}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [
        className,
        cls[view],
      ])}
    >
      <Card className={cls.card} border="partial" padding="0">
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text
                text={formatDateToCustom(article.createdAt)}
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
