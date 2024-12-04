import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { SortOrder } from "@/6_shared/types/sort";

import { ArticleSortField, ArticleType, ArticleView } from "../../model/consts/articleConsts";
import { articlesPageActions } from "../../model/slice/articlesPageSlice";

export const useArticlesPage = () => {
  const dispatch = useDispatch();

  const setPage = useCallback(
    (page: number) => {
      dispatch(articlesPageActions.setPage(page));
    },
    [dispatch],
  );

  const setView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const setOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlesPageActions.setOrder(order));
    },
    [dispatch],
  );

  const setSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(sort));
    },
    [dispatch],
  );

  const setType = useCallback(
    (type: ArticleType) => {
      dispatch(articlesPageActions.setType(type));
    },
    [dispatch],
  );

  const setSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
    },
    [dispatch],
  );

  return {
    setPage,
    setView,
    setOrder,
    setSort,
    setType,
    setSearch,
  };
};
