import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { Article, getAllArticles } from "@/5_entities/Article";

import { addQueryParams } from "@/6_shared/lib/url/addQueryParams/addQueryParams";

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
  replace?: boolean;
  username?: string;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>(
  "articlesPage/fetchArticlesList",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const page = getArticlesPageNum(getState());
    const limit = getArticlesPageLimit(getState());
    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const type = getArticlesPageType(getState());

    try {
      addQueryParams({ sort, order, type, search });

      const params = {
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        _type: type,
        q: search,
      };

      console.log(params);

      const response = await dispatch(getAllArticles({ params })).unwrap();

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (e) {
      return rejectWithValue("error");
    }
  },
);
