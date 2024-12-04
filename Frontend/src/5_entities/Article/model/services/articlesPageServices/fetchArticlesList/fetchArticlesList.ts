import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { ArticleDetailsResponse } from "@/5_entities/Article";

import { addQueryParams } from "@/6_shared/lib/url/addQueryParams/addQueryParams";

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../../selectors/articlesPageSelectors/articlesPageSelectors";

interface FetchArticlesListProps {
  replace?: boolean;
  username?: string;
}

export const fetchArticlesList = createAsyncThunk<
  ArticleDetailsResponse[],
  FetchArticlesListProps,
  ThunkConfig<string>
>(
  "articlesPage/fetchArticlesList",
  async (args, thunkApi) => {
    const { rejectWithValue, getState, extra } = thunkApi;
    const { replace = false } = args || {};
    const { api } = extra; // Assuming you have an API instance in your extra arguments

    const page = getArticlesPageNum(getState());
    const limit = getArticlesPageLimit(getState());
    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const type = getArticlesPageType(getState());

    try {
      addQueryParams({ sort, order, type, search });

      const response = await api.get<ArticleDetailsResponse[]>("/articles", {
        params: {
          _expand: "user",
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          type: type !== "ALL" ? type : undefined,
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
