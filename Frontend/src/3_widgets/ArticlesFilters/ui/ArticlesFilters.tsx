import { memo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortSelector } from "@/4_features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/4_features/ArticleTypeTabs";

import { ArticleSortField, ArticleType } from "@/5_entities/Article";

import SearchIcon from "@/6_shared/assets/icons/search.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { SortOrder } from "@/6_shared/types/sort";
import { Card } from "@/6_shared/ui/Card/Card";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { Input } from "@/6_shared/ui/Input/Input";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./ArticlesFilters.module.scss";

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    type,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          onChange={onChangeSearch}
          value={search}
          size="s"
          placeholder={t("Поиск")}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
