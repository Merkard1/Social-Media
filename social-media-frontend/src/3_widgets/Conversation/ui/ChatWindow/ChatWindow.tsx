// ChatWindow.tsx

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { fetchMessages, selectMessagesByChatId } from "@/5_entities/Chat";
import { Message, MessageItem } from "@/5_entities/Message";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/6_shared/ui/Card/Card";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./ChatWindow.module.scss";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow = (props: ChatWindowProps) => {
  const { chatId } = props;
  const dispatch = useAppDispatch();

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) {
      dispatch(fetchMessages({ chatId }));
    }
  }, [chatId, dispatch]);

  const rawMessages = useSelector((state) =>
    selectMessagesByChatId(state, chatId)) as Message[];

  const sortedMessages = [...rawMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [sortedMessages]);

  return (
    <Card max className={cls.ChatWindow} ref={messagesRef}>
      <VStack max gap="8" justify="end">
        {sortedMessages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </VStack>
    </Card>
  );
};
