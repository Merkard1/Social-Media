import { memo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./Text.module.scss";

export type TextVariant = "primary" | "error" | "accent";

export type TextAlign = "right" | "left" | "center";

export type TextSize = "s" | "m" | "l";

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    max?: boolean;
    "data-testid"?: string;
}

type HeaderTagType = "h1" | "h2" | "h3";

const mapSizeToClass: Record<TextSize, string> = {
  s: cls.size_s,
  m: cls.size_m,
  l: cls.size_l,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: "h3",
  m: "h2",
  l: "h1",
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    variant = "primary",
    align = "left",
    size = "m",
    bold,
    max,
    "data-testid": dataTestId = "Text",
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cls[variant], cls[align], sizeClass];
  return (
    <div
      className={classNames(
        cls.Text,
        { [cls.bold]: bold, [cls.max]: max },
        additionalClasses,
      )}
    >
      {title && (
        <HeaderTag
          className={classNames(cls.title, { [cls.max]: max }, [])}
          data-testid={`${dataTestId}.Header`}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={classNames(cls.text, { [cls.max]: max }, [])} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </p>
      )}
    </div>
  );
});
