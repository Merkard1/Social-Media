import { useTranslation } from "react-i18next";

import { chatListReducer, ChatSidebar } from "@/3_widgets/ChatList";
import { conversationReducer } from "@/3_widgets/Conversation";
import { Conversation } from "@/3_widgets/Conversation";

import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Card } from "@/6_shared/ui/Card/Card";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./ChatPage.module.scss";

interface ChatPageProps {
 className?: string
}

const reducers: ReducersList = {
  chatList: chatListReducer,
  conversation: conversationReducer,
};

const ChatPage = (props : ChatPageProps) => {
  const { className } = props;
  const { t } = useTranslation("chat");

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Card className={cls.ChatPage} border="round" padding="24">
        <VStack className={cls.ChatSidebar}>
          <ChatSidebar />
        </VStack>
        <Conversation />
      </Card>
    </DynamicModuleLoader>
  );
};

export default ChatPage;
