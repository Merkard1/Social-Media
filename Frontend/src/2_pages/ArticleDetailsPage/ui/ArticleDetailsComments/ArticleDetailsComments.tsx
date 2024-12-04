import { memo, useCallback, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { AddCommentForm } from "@/4_features/addCommentForm";

import {
  CommentList,
  getAllCommentsForArticle,
  addCommentForArticle,
  fetchCommentsByArticleId,
  getArticleCommentsIsLoading } from "@/5_entities/Comment";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Loader } from "@/6_shared/ui/Loader/Loader";
import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const { className, id } = props;
  const { t } = useTranslation("article-details");
  const comments = useSelector(getAllCommentsForArticle);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id));
    } else {
      console.log("No id provided");
    }
  });

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      <Text
        size="l"
        title={t("Comments")}
      />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments as any}
      />
    </VStack>
  );
});
