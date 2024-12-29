import { useEffect } from "react";

import { ChatSidebar } from "@/3_widgets/ChatList";
import { Conversation } from "@/3_widgets/Conversation";

import {
  fetchChatList,
  chatReducer,
  useChatsList,
  useChatsSelectedChat,
  chatActions,
} from "@/5_entities/Chat";
import {
  usersListReducer,
  useUserAuthData,
  useUsersListAllUsers,
} from "@/5_entities/User";

import socketService from "@/6_shared/api/socketService";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/6_shared/ui/Card/Card";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./ChatPage.module.scss";

interface ChatPageProps {}

const reducers: ReducersList = {
  chat: chatReducer,
  usersList: usersListReducer,
};

const ChatPage = (props: ChatPageProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useUserAuthData();
  const chats = useChatsList();
  const selectedChat = useChatsSelectedChat();
  const usersList = useUsersListAllUsers();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchChatList());
    }
  }, [currentUser?.id, dispatch]);

  useEffect(() => {
    if (!currentUser?.id) return;

    socketService.connect().then(() => {
      console.log("Socket connected (or was already).");
    });

    return () => {
      socketService.disconnect();
    };
  }, [currentUser?.id]);

  useEffect(() => {
    if (!currentUser?.id || !chats.length) return;

    chats.forEach((chat) => {
      socketService.joinChat(chat.id);
      console.log(`Emitted 'join:chat' for chat ID: ${chat.id}`);
    });

    const handleGlobalMessage = (msg: any) => {
      console.log("Received 'message:received' -> ", msg);
      dispatch(
        chatActions.addMessageToChat({
          chatId: msg.chatId,
          message: msg,
        }),
      );
    };

    socketService.on("message:received", handleGlobalMessage);

    return () => {
      socketService.off("message:received", handleGlobalMessage);
    };
  }, [chats, currentUser?.id, dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Card className={cls.ChatPage} border="round" padding="24">
        <VStack className={cls.ChatSidebar}>
          {currentUser && <ChatSidebar currentUser={currentUser} />}
        </VStack>
        {selectedChat && (
          <Conversation
            currentUser={currentUser!}
            selectedChat={selectedChat}
          />
        )}
      </Card>
    </DynamicModuleLoader>
  );
};

export default ChatPage;
