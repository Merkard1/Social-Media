import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Input } from "@/6_shared/ui/Input/Input";
import { VStack } from "@/6_shared/ui/Stack";

import { ChatPreviewList } from "../ChatPreviewList/ChatPreviewList";

import cls from "./ChatSidebar.module.scss";

interface ChatSidebarProps {
 className?: string
}

export const ChatSidebar = ({ className } : ChatSidebarProps) => (
  <VStack className={classNames(cls.ChatSidebar, {}, [className])} max gap="16">
    <Input placeholder="Search" max />
    <ChatPreviewList />
  </VStack>
);
