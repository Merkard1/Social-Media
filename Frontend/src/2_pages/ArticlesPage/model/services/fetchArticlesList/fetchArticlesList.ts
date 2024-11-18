import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Article, ArticleType } from "@/5_entities/Article";

import { addQueryParams } from "@/6_shared/lib/url/addQueryParams/addQueryParams";

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType } from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
    >(
      "articlesPage/fetchArticlesList",
      async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const page = getArticlesPageNum(getState());
        const limit = getArticlesPageLimit(getState());
        const order = getArticlesPageOrder(getState());
        const sort = getArticlesPageSort(getState());
        const search = getArticlesPageSearch(getState());
        const type = getArticlesPageType(getState());

        try {
          addQueryParams({ sort, order, search });

          const response = await extra.api.get<Article[]>("/articles", {
            params: {
              _expand: "user",
              _limit: limit,
              _page: page,
              _sort: sort,
              _order: order,
              type: type === ArticleType.ALL ? undefined : type,
              q: search,
            },
          });

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue("error");
        }
      },
    );
