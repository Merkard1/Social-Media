// frontend/src/components/Conversation.tsx

import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getChatListSelectedChatId } from "@/3_widgets/ChatList";

import socketService from "@/6_shared/api/socket"; // Ensure correct import path
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/6_shared/ui/Button/Button";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";

import { getConversationCurrentMessage, getConversationMessages } from "../model/selectors/ConversationSelectors";
import { conversationActions } from "../model/slice/ConversationSlice";
import { Message } from "../model/types/ConversationSchema";

import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import cls from "./Conversation.module.scss";

interface ConversationProps {
  className?: string;
}

export const Conversation = (props: ConversationProps) => {
  const { className } = props;
  const { t } = useTranslation("chat");
  const dispatch = useAppDispatch();
  const selectedChatId = useSelector(getChatListSelectedChatId);
  const messages = useSelector(getConversationMessages);
  const currentMessage = useSelector(getConversationCurrentMessage);

  const [isConnected, setIsConnected] = useState<boolean>(false);

  // **1. Establish Socket Connection on Component Mount**
  useEffect(() => {
    const token = localStorage.getItem("jwt-token") || ""; // Retrieve token if using authentication
    socketService.connect(token);

    // Listen to connection events to update isConnected state
    const handleConnect = () => {
      console.log("Socket connected:", socketService.socketInstance?.id);
      setIsConnected(true);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    };

    socketService.on("connect", handleConnect);
    socketService.on("disconnect", handleDisconnect);

    return () => {
      socketService.off("connect", handleConnect);
      socketService.off("disconnect", handleDisconnect);
      socketService.disconnect();
    };
  }, []);

  // **2. Handle Joining and Leaving Chat Rooms**
  useEffect(() => {
    if (selectedChatId) {
      socketService.emit("join:chat", selectedChatId);
      socketService.emit("messages:load", { chatId: selectedChatId });
    }

    return () => {
      if (selectedChatId) {
        socketService.emit("leave:chat", selectedChatId);
        dispatch(conversationActions.clearMessages());
      }
    };
  }, [dispatch, selectedChatId]);

  // **3. Set Up Socket Event Listeners**
  useEffect(() => {
    const handleMessageReceived = (messageData: Message) => {
      dispatch(conversationActions.addMessage(messageData));
    };

    const handleMessagesLoaded = (loadedMessages: Message[]) => {
      dispatch(conversationActions.setMessages(loadedMessages));
    };

    const handleMessageUpdated = (updatedMessage: Message) => {
      dispatch(conversationActions.updateMessage(updatedMessage));
    };

    const handleMessageDeleted = (deletedMessageId: string) => {
      dispatch(conversationActions.deleteMessage(deletedMessageId));
    };

    const handleError = (errorMsg: string) => {
      dispatch(conversationActions.setError(errorMsg));
      // Optionally, display a user-friendly error message
      alert(`Error: ${errorMsg}`);
    };

    socketService.on("message:received", handleMessageReceived);
    socketService.on("messages:loaded", handleMessagesLoaded);
    socketService.on("message:updated", handleMessageUpdated);
    socketService.on("message:deleted", handleMessageDeleted);
    socketService.on("error", handleError);

    return () => {
      socketService.off("message:received", handleMessageReceived);
      socketService.off("messages:loaded", handleMessagesLoaded);
      socketService.off("message:updated", handleMessageUpdated);
      socketService.off("message:deleted", handleMessageDeleted);
      socketService.off("error", handleError);
    };
  }, [dispatch]);

  // **4. Handle Input Change**
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(conversationActions.setCurrentMessage(e.target.value));
  }, [dispatch]);

  // **5. Handle Sending Messages**
  const handleSend = useCallback(() => {
    if (currentMessage.trim() === "" || !selectedChatId) return;

    const tempId = Date.now().toString();
    const msg: Message = {
      id: tempId, // Temporary ID for optimistic UI
      senderId: "currentUserId", // Replace with actual user ID
      content: currentMessage,
      createdAt: new Date().toISOString(),
      chatId: selectedChatId,
    };

    // **5.a. Optimistically Add Message to UI**
    dispatch(conversationActions.addMessage(msg));

    // **5.b. Emit Message to Server with Acknowledgment Callback**
    socketService.emit("message:send", msg, (savedMessage: Message) => {
      dispatch(conversationActions.updateMessage(savedMessage));
    });

    // **5.c. Clear the Input Field**
    dispatch(conversationActions.setCurrentMessage(""));
  }, [currentMessage, dispatch, selectedChatId]);

  return (
    <VStack className={`${cls.ChatWindow} ${className || ""}`} gap="8">
      {/* **6. Display Connection Status** */}
      <div className={cls.ConnectionStatus}>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: isConnected ? "green" : "red",
            marginRight: "8px",
          }}
        />
        <span>{isConnected ? "Connected" : "Disconnected"}</span>
      </div>

      <ChatHeader />
      <ChatWindow />
      <HStack max gap="16">
        <Input
          onChange={() => handleInputChange}
          placeholder={`${t("Write a message")}...`}
          value={currentMessage}
        />
        <Button onClick={handleSend}>{t("Send")}</Button>
      </HStack>
    </VStack>
  );
};
