import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Card } from "@/6_shared/ui/Card/Card";
import { HStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./ChatHeader.module.scss";

interface ChatHeaderProps {
 className?: string
}

export const ChatHeader = (props : ChatHeaderProps) => {
  const { className } = props;
  return (
    <HStack max className={cls.ChatHeader}>
      <Card max padding="8">
        <HStack gap="16">
          <Avatar src="" size={35} />
          <Text text="username" />
        </HStack>
      </Card>
    </HStack>
  );
};
