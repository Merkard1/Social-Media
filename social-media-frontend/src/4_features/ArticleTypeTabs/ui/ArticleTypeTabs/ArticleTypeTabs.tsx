import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleType } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { TabItem, Tabs } from "@/6_shared/ui/Tabs/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation("articles");

  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: "ALL",
        content: t("All"),
      },
      {
        value: "IT",
        content: t("IT"),
      },
      {
        value: "ECONOMICS",
        content: t("Economics"),
      },
      {
        value: "SCIENCE",
        content: t("Science"),
      },
    ],
    [t],
  );

  const onTabClick = useCallback((tab: ArticleType) => {
    onChangeType(tab);
  }, [onChangeType]);

  return (
    <Tabs
      direction="column"
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames("Tabs", {}, [className])}
    />
  );
});
