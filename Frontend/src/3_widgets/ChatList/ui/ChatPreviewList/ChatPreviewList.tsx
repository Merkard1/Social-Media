import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  Chat,
  chatActions,
  useChatsList,
  useChatsError,
  useChatsIsLoading,
} from "@/5_entities/Chat";
import { User } from "@/5_entities/User";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { VStack } from "@/6_shared/ui/Stack";

import { ChatPreviewItem } from "../ChatPreviewItem/ChatPreviewItem";
import Error from "../Components/Error";
import LoadingListItem from "../Components/LoadingListItem";
import NotFound from "../Components/NotFound";

import cls from "./ChatPreviewList.module.scss";

interface ChatPreviewListProps {
  className?: string;
  currentUser: User;
}

export const ChatPreviewList = memo((props: ChatPreviewListProps) => {
  const { className, currentUser } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoading = useChatsIsLoading();
  const error = useChatsError();
  const chats = useChatsList();

  const handleChatSelection = useCallback(
    (chat: Chat) => {
      dispatch(chatActions.setSelectedChat(chat));
    },
    [dispatch],
  );

  if (isLoading) {
    return <LoadingListItem />;
  }

  if (error) {
    return <Error />;
  }

  if (!chats || chats.length === 0) {
    return <NotFound text={t("No Chats found")} />;
  }

  return (
    <VStack max gap="8" className={cls.ChatPreviewList}>
      {chats.map((chat: Chat) => (
        <ChatPreviewItem
          key={chat.id}
          chat={chat}
          handleChatSelection={() => handleChatSelection(chat)}
          currentUser={currentUser}
        />
      ))}
    </VStack>
  );
});
