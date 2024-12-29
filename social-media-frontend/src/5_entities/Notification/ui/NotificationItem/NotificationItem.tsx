import { memo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Card } from "@/6_shared/ui/Card/Card";
import { Text } from "@/6_shared/ui/Text/Text";

import { Notification } from "../../model/types/notification";

import cls from "./NotificationItem.module.scss";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <Card
      className={classNames(cls.NotificationItem, {}, [
        className,
      ])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a
        className={cls.link}
        target="_blank"
        href={item.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
});
