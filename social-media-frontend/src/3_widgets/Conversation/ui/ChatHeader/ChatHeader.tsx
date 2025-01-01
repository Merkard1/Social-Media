import { useCallback } from "react";

import { chatActions, useChatsSelectedChat } from "@/5_entities/Chat";
import { User } from "@/5_entities/User";

import backIcon from "@/6_shared/assets/icons/arrow-bottom.svg";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import useMediaQuery from "@/6_shared/lib/hooks/useMedia/useMedia";
import { Avatar } from "@/6_shared/ui/Avatar/Avatar";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { HStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./ChatHeader.module.scss";

interface ChatHeaderProps {
 currentUser: User
}

export const ChatHeader = (props : ChatHeaderProps) => {
  const { currentUser } = props;
  const isBelowLargeScreen = useMediaQuery("(max-width: 1200px)");
  const participant = useChatsSelectedChat()?.participants.filter((user) => user.id !== currentUser.id);
  const dispatch = useAppDispatch();

  const handleBackArrowClick = useCallback(() => {
    dispatch(chatActions.setSelectedChat(null));
  }, [dispatch]);

  if (!participant) return null;

  const { username } = participant[0];
  const avatar = participant[0].profile?.avatar;

  return (
    <HStack max>
      <Card max padding="8">
        <HStack gap="16">
          <Button variant="clear" onClick={handleBackArrowClick} className={cls.backIconBtn}>
            <Icon Svg={backIcon} className={cls.backIcon} />
          </Button>
          <Avatar src={avatar} size={35} />
          <Text text={username} />
        </HStack>
      </Card>
    </HStack>
  );
};
