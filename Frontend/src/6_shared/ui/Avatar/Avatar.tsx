import { CSSProperties, useMemo } from "react";

import UserIcon from "@/6_shared/assets/icons/user-filled.svg";
import { classNames, Mods } from "@/6_shared/lib/classNames/classNames";

import { AppImage } from "../AppImage/AppImage";
import { Icon } from "../Icon/Icon";
import { Skeleton } from "../Skeleton/Skeleton";

import cls from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
