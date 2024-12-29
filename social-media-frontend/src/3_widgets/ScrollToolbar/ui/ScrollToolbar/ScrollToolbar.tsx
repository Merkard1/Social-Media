import { memo } from "react";

import { ScrollToTopButton } from "@/4_features/scrollToTopButton";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./ScrollToolbar.module.scss";

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
