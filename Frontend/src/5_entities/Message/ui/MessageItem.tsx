import React, { memo } from "react";

import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { Message as MessageType } from "../model/types/Message";

interface MessageItemProps {
  className?: string;
  message: MessageType;
}

export const MessageItem = memo((props: MessageItemProps) => {
  const { className, message } = props;

  return (
    <HStack justify="start" align="start" gap="8">
      <Avatar src={message.sender?.profile?.avatar} size={40} />
      <Text text={message?.sender?.username} bold />
      <VStack gap="8">
        <Text text={message?.content} />
      </VStack>
    </HStack>
  );
});
