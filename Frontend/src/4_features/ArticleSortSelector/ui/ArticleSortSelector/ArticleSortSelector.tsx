import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortField } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { SortOrder } from "@/6_shared/types/sort";
import { ListBox } from "@/6_shared/ui/Popups";
import { SelectOption } from "@/6_shared/ui/Select/Select";
import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import cls from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("ascending"),
      },
      {
        value: "desc",
        content: t("descending"),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: "createdAt",
        content: t("date"),
      },
      {
        value: "title",
        content: t("name"),
      },
      {
        value: "views",
        content: t("views"),
      },
    ],
    [t],
  );

  return (
    <div
      className={classNames(
        cls.ArticleSortSelectorRedesigned,
        {},
        [className],
      )}
    >
      <VStack gap="8" colomnToRow>
        <Text text={`${t("Sort with")} :`} />
        <ListBox
          items={sortFieldOptions}
          value={sort}
          onChange={onChangeSort}
        />
        <ListBox
          items={orderOptions}
          value={order}
          onChange={onChangeOrder}
        />
      </VStack>
    </div>
  );
});
