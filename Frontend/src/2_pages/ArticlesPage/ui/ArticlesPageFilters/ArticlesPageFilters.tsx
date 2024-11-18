import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { fetchArticlesList } from "@/2_pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";

import { ArticleSortSelector } from "@/4_features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/4_features/ArticleTypeTabs";
import { ArticleViewSelector } from "@/4_features/ArticleViewSelector";

import { ArticleSortField, ArticleView } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/6_shared/lib/hooks/useDebounce/useDebounce";
import { SortOrder } from "@/6_shared/types/sort";
import { Card } from "@/6_shared/ui/Card/Card";
import { Input } from "@/6_shared/ui/Input/Input";

import {
  useArticlesPageOrder,
  useArticlesPageSearch,
  useArticlesPageSort,
  useArticlesPageType,
  useArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { useArticlesPage } from "../../model/slices/ArticlesPageSlice";

import cls from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
 className?: string
}

const ArticlesPageFilters = ({ className } : ArticlesPageFiltersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const view = useArticlesPageView();
  const order = useArticlesPageOrder();
  const sort = useArticlesPageSort();
  const search = useArticlesPageSearch();
  const type = useArticlesPageType();
  const { setPage, setView, setOrder, setSort, setType, setSearch } = useArticlesPage();

  const fetchData = useCallback(
    () => {
      dispatch(fetchArticlesList({ replace: true }));
    },
    [dispatch],
  );

  const setToFirstPage = useCallback(
    () => {
      setPage(1);
    },
    [setPage],
  );

  const onChangeView = useCallback(
    (view: ArticleView) => {
      setView(view);
      setToFirstPage();
      fetchData();
    },
    [setView, setToFirstPage, fetchData],
  );

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      setOrder(order);
      setToFirstPage();
      fetchData();
    },
    [setOrder, setToFirstPage, fetchData],
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      setSort(sort);
      setToFirstPage();
      fetchData();
    },
    [setSort, setToFirstPage, fetchData],
  );

  // To Fix
  const onChangeType = useCallback(
    (tab: any) => {
      setType(tab);
      setToFirstPage();
      fetchData();
    },
    [setType, setToFirstPage, fetchData],
  );

  const debounceFetchData = useDebounce(fetchData, 500);
  const onChangeSearch = useCallback((search: string) => {
    setSearch(search);
    setToFirstPage();
    debounceFetchData();
  }, [setSearch, setToFirstPage, debounceFetchData]);

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card>
        <Input onChange={onChangeSearch} value={search} className={cls.search} placeholder={t("Search")} />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  );
};

export default ArticlesPageFilters;
