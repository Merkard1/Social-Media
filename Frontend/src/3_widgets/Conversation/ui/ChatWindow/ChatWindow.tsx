import { ChatPreviewItem } from "@/3_widgets/ChatList/ui/ChatPreviewItem/ChatPreciewItem";

import { Card } from "@/6_shared/ui/Card/Card";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./ChatWindow.module.scss";

interface ChatWindowProps {
}

export const ChatWindow = (props : ChatWindowProps) => {
  const arr: { id: number }[] = Array.from({ length: 20 }, (_, index) => ({ id: index }));
  return (
    <Card max className={cls.ChatWindow}>
      <VStack max>
        {arr.map((item) => (
          <ChatPreviewItem key={item.id} />
        ))}
      </VStack>
    </Card>);
};
