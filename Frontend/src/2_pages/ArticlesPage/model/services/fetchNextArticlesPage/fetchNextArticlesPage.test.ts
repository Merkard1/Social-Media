import { TestAsyncThunk } from "@/6_shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

import { fetchNextArticlesPage } from "./fetchNextArticlesPage";

// Mock the fetchArticlesList action
jest.mock("../fetchArticlesList/fetchArticlesList");

describe("fetchNextArticlesPage.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    // Expect the dispatch to be called with correct actions
    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(thunk.dispatch).toHaveBeenCalledWith({
      type: "articlesPageSlice/setPage",
      payload: 3,
    });
    expect(fetchArticlesList).toHaveBeenCalledWith({});
  });

  test("fetchArticlesList not called when hasMore is false", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });

    await thunk.callThunk();

    // Expect the dispatch to be called only for setting the state
    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });

  test("fetchArticlesList not called when isLoading is true", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    // Expect the dispatch to be called only for setting the state
    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
