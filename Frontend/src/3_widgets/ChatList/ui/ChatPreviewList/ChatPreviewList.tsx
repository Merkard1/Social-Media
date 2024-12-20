import { useTranslation } from "react-i18next";

import { VStack } from "@/6_shared/ui/Stack";

import { ChatPreviewItem } from "../ChatPreviewItem/ChatPreciewItem";

import cls from "./ChatPreviewList.module.scss";

interface ChatPreviewListProps {
 className?: string
}

export const ChatPreviewList = ({ className } : ChatPreviewListProps) => {
  const { t } = useTranslation();

  const arr: { id: number }[] = Array.from({ length: 20 }, (_, index) => ({ id: index }));

  return (
    <VStack max gap="8" className={cls.ChatPreviewList}>
      {arr.map((item) => (
        <ChatPreviewItem key={item.id} />
      ))}
    </VStack>
  );
};
