import React, { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { NotificationList } from "@/5_entities/Notification";

import NotificationIcon from "@/6_shared/assets/icons/notification.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Drawer } from "@/6_shared/ui/Drawer/Drawer";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { Popover } from "@/6_shared/ui/Popups";

import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [
            className,
          ])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
