import { useTranslation } from "react-i18next";

import { Chat, useChatsSelectedChat } from "@/5_entities/Chat";
import { User } from "@/5_entities/User";

import { formatMessageTime } from "@/6_shared/lib/dateFormat/dateFormat";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Card } from "@/6_shared/ui/Card/Card";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

interface ChatPreviewItemProps {
 className?: string
 chat: Chat;
 handleChatSelection: (chat: Chat) => void
 currentUser: User
}

export const ChatPreviewItem = (props: ChatPreviewItemProps) => {
  const { className, chat, handleChatSelection, currentUser } = props;
  const { t } = useTranslation();

  const selectedChat = useChatsSelectedChat();
  const isChatSelected = selectedChat?.id === chat?.id ? "outlined" : "light";

  const participant = chat.participants.filter((user) => user.id !== currentUser.id);

  const lastMessage = chat.messages.slice(-1).pop()?.content;
  const time = formatMessageTime(chat?.messages[0]?.createdAt);

  return (
    <Card max variant={isChatSelected} onClick={() => handleChatSelection(chat)}>
      <HStack gap="8">
        <Avatar src={participant[0].profile?.avatar} size={50} />
        <VStack gap="4" max>
          <HStack justify="between" max>
            <Text text={participant[0].username} bold />
            <Text text={time} />
          </HStack>
          <Text text={lastMessage} />
        </VStack>
      </HStack>
    </Card>
  );
};
