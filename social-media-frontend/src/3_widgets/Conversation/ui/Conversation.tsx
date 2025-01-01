import React, { useCallback, useState, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import { Chat } from "@/5_entities/Chat";
import { User } from "@/5_entities/User";

import socketService from "@/6_shared/api/socketService";
import { Button } from "@/6_shared/ui/Button/Button";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";

import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import cls from "./Conversation.module.scss";

interface ConversationProps {
  className?: string;
  currentUser: User;
  selectedChat: Chat;
}

export const Conversation = (props: ConversationProps) => {
  const { className, currentUser, selectedChat } = props;
  const { t } = useTranslation("chat");

  const [content, setContent] = useState("");

  const onChangeMessage = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleSendMessage = useCallback(() => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const recipient = selectedChat.participants.find((p) => p.id !== currentUser.id);
    if (!recipient) {
      console.error("No recipient found!");
      return;
    }

    socketService.emit("message:send", {
      recipientId: recipient.id,
      content: trimmed,
    });

    setContent("");
  }, [content, selectedChat, currentUser]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <VStack className={`${cls.ChatWindow} ${className || ""}`} gap="8">
      <ChatHeader currentUser={currentUser} />
      <ChatWindow chatId={selectedChat.id} />
      <HStack max gap="16">
        <Input
          placeholder={`${t("Write a message")}...`}
          value={content}
          onChange={onChangeMessage}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSendMessage} disabled={!content.trim()}>
          {t("Send")}
        </Button>
      </HStack>
    </VStack>
  );
};
