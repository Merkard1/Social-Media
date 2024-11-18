import { ReactNode, useCallback } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import { Card } from "../Card/Card";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

import cls from "./Tabs.module.scss";

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
    onTabClick: (tabValue: T) => void;
    direction?: FlexDirection;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className, tabs, onTabClick, value, direction = "row" } = props;

  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab.value as T);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      align="start"
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? "light" : "normal"}
            className={classNames(cls.tab, {
              [cls.selected]: isSelected,
            })}
            key={tab.value}
            onClick={clickHandle(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};
