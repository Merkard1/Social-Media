import { useChatsSelectedChat } from "@/5_entities/Chat";
import { User } from "@/5_entities/User";

import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Card } from "@/6_shared/ui/Card/Card";
import { HStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./ChatHeader.module.scss";

interface ChatHeaderProps {
 className?: string
 currentUser: User
}

export const ChatHeader = (props : ChatHeaderProps) => {
  const { className, currentUser } = props;
  const participant = useChatsSelectedChat()?.participants.filter((user) => user.id !== currentUser.id);

  console.log(useChatsSelectedChat()?.participants);

  if (!participant) return null;

  const { username } = participant[0];
  const avatar = participant[0].profile?.avatar;

  return (
    <HStack max className={cls.ChatHeader}>
      <Card max padding="8">
        <HStack gap="16">
          <Avatar src={avatar} size={35} />
          <Text text={username} />
        </HStack>
      </Card>
    </HStack>
  );
};
