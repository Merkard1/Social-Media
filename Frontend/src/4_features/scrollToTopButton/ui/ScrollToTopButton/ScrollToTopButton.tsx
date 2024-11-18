import { memo } from "react";

import CircleIcon from "@/6_shared/assets/icons/circle-up.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Icon } from "@/6_shared/ui/Icon/Icon";

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onCLick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onCLick}
      width={32}
      height={32}
      className={classNames("", {}, [className])}
    />
  );
});
