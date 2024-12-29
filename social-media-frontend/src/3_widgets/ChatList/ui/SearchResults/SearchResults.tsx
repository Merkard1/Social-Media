import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { chatActions, createChat } from "@/5_entities/Chat";
import {
  getUsersListAllUsers,
  getUsersListError,
  getUsersListIsLoading,
  User,
} from "@/5_entities/User";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { HStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import Error from "../Components/Error";
import LoadingListItem from "../Components/LoadingListItem";
import NotFound from "../Components/NotFound";

import cls from "./SearchResults.module.scss";

interface SearchResultsProps {
  currentUser: User;
}

export const SearchResults = memo((props: SearchResultsProps) => {
  const { currentUser } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const users = useSelector(getUsersListAllUsers);
  const isLoading = useSelector(getUsersListIsLoading);
  const error = useSelector(getUsersListError);

  const usersList = users.filter((user) => user.id !== currentUser?.id);

  const handleChatCreation = useCallback(
    async (user: User) => {
      try {
        const createdChat = await dispatch(createChat({ recipientId: user.id })).unwrap();

        dispatch(chatActions.setSelectedChat(createdChat));
      } catch (err) {
        console.error("Failed to create/find chat:", err);
      }
    },
    [dispatch],
  );

  if (isLoading) {
    return <LoadingListItem />;
  }

  if (error) {
    return <Error />;
  }

  if (usersList.length === 0) {
    return <NotFound text={t("No Users found")} />;
  }

  return (
    <>
      {usersList.map((user) => (
        <HStack
          gap="8"
          onClick={() => {
            handleChatCreation(user as User);
          }}
          className={cls.SearchResults}
          key={user.username}
        >
          <Avatar size={40} src={user.profile?.avatar} />
          <Text text={user.username} bold />
        </HStack>
      ))}
    </>
  );
});
