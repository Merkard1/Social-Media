import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppImage } from "@/6_shared/ui/AppImage/AppImage";
import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import {
  getArticlesDetailsData,
  getArticlesDetailsError,
  getArticlesDetailsIsLoading,
} from "../../model/selectors/articleDetailsSelectors/articleDetailsSelectors";
import { fetchArticleData } from "../../model/services/articleServices/fetchArticleData/fetchArticleData";
import { articleReducer } from "../../model/slice";
import { ArticleBlock } from "../../model/types/article";
import { renderArticleBlock } from "../renderArticleBlock/renderArticleBlock";

import cls from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
  article: articleReducer,
};

export const ArticleDetailsSkeleton = () => (
  <VStack gap="16" max>
    <Skeleton
      className={cls.avatar}
      width={200}
      height={200}
      border="50%"
    />
    <Skeleton className={cls.title} width={300} height={32} />
    <Skeleton className={cls.skeleton} width={600} height={24} />
    <Skeleton className={cls.skeleton} width="100%" height={200} />
    <Skeleton className={cls.skeleton} width="100%" height={200} />
  </VStack>
);

const Content = () => {
  const article = useSelector(getArticlesDetailsData);

  if (!article) {
    return null;
  }

  return (
    <>
      <Text title={article.title} size="l" bold />
      <Text title={article.subtitle} />
      {article.img && (
        <AppImage
          fallback={
            <Skeleton
              width="100%"
              height={420}
              border="16px"
            />
          }
          src={article.img}
          className={cls.img}
        />
      )}
      {article.blocks?.map((block: ArticleBlock) => renderArticleBlock({ block }))}
    </>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticlesDetailsIsLoading);
  const error = useSelector(getArticlesDetailsError);
  const article = useSelector(getArticlesDetailsData);

  useEffect(() => {
    if (__PROJECT__ !== "storybook" && id) {
      dispatch(fetchArticleData(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading || !article) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text
        align="center"
        title={t("An error occurred while loading the article.")}
      />
    );
  } else {
    content = <Content />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap="16"
        max
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
