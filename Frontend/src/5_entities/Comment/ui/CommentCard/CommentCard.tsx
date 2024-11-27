import { skipToken } from "@reduxjs/toolkit/query";
import { memo } from "react";

import { useGetProfileQuery } from "@/5_entities/Profile";

import { getRouteProfile } from "@/6_shared/const/router";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppLink } from "@/6_shared/ui/AppLink/AppLink";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Card } from "@/6_shared/ui/Card/Card";
import { Skeleton as SkeletonRedesigned } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { Comment } from "../../model/types/comment";

import cls from "./CommentCard.module.scss";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const username = comment?.user?.username || "";
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(
    username ? { username } : skipToken,
  );

  const Skeleton = SkeletonRedesigned;

  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [
          className,
          cls.loading,
        ])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton
            height={16}
            width={100}
            className={cls.username}
          />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <Card padding="24" border="partial" max>
      <VStack
        data-testid="CommentCard.Content"
        gap="8"
        max
        className={classNames(cls.CommentCardRedesigned, {}, [
          className,
        ])}
      >
        <AppLink to={getRouteProfile(comment.user.username)}>
          <HStack gap="8">
            {profile?.avatar ? (
              <Avatar
                size={30}
                src={profile.avatar}
              />
            ) : null}
            <Text text={comment.user.username} bold />
          </HStack>
        </AppLink>
        <Text text={comment.content} />
      </VStack>
    </Card>
  );
});
