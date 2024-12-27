import { memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { Page } from "@/3_widgets/Page";

import { ArticlePageGreeting } from "@/4_features/articlePageGreeting";

import {
  fetchNextArticlesPage,
  initArticlesPage,
  articlesPageActions,
  articlesPageReducer,
} from "@/5_entities/Article";

import { StickyContentLayout } from "@/6_shared/layouts";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import useMediaQuery from "@/6_shared/lib/hooks/useMedia/useMedia";

import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";

import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const isBelowLargeScreen = useMediaQuery("(max-width: 1200px)");

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));

    if (isBelowLargeScreen) {
      dispatch(articlesPageActions.setView("BIG"));
    }
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <StickyContentLayout
        left={<ViewSelectorContainer />}
        right={<FiltersContainer />}
        content={
          <Page
            data-testid="ArticlesPage"
            onScrollEnd={onLoadNextPart}
            className={classNames(
              cls.ArticlesPage,
              {},
              [className],
            )}
          >
            <ArticleInfiniteList className={cls.list} />
            <ArticlePageGreeting />
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
