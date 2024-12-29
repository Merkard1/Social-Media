// src/6_shared/ui/Card/Card.tsx

import React, { forwardRef, memo, ReactNode } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./Card.module.scss";

export type CardVariant = "normal" | "outlined" | "light";
export type CardPadding = "0" | "8" | "16" | "24";
export type CardBorder = "round" | "normal" | "partial";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
  fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  0: "gap_0",
  8: "gap_8",
  16: "gap_16",
  24: "gap_24",
};

const CardComponent = (
  props: CardProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    children,
    variant = "normal",
    max,
    padding = "8",
    border = "normal",
    fullHeight,
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(
        cls.Card,
        {
          [cls.max]: max,
          [cls.fullHeight]: fullHeight,
        },
        [className, cls[variant], cls[paddingClass], cls[border]],
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  );
};

// Wrap the component with forwardRef and memo
export const Card = memo(forwardRef(CardComponent));

Card.displayName = "Card";
