import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";
import rtkApi from "@/6_shared/api/rtkApi";

import { Article } from "../model/types/article";

interface ArticleInformation {
  id: string;
  username: string;
  params: any;
}

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllArticles: build.mutation<Article, ArticleInformation>({
      query: () => ({
        url: getAPIUserEndpoint({ type: "articles" }),
        method: "GET",
      }),
    }),
    getAllArticlesForUser: build.mutation<Article, ArticleInformation>({
      query: ({ username }) => ({
        url: getAPIUserEndpoint({ type: "articles/user", values: [username] }),
        method: "GET",
      }),
    }),
    getArticleById: build.mutation<Article, ArticleInformation>({
      query: ({ id }) => ({
        url: getAPIUserEndpoint({ type: "articles", values: [id] }),
        method: "GET",
      }),
    }),
    changeArticle: build.mutation<Article, ArticleInformation>({
      query: ({ id }) => ({
        url: getAPIUserEndpoint({ type: "articles", values: [id] }),
        method: "PATCH",
      }),
    }),
    deleteArticle: build.mutation<Article, ArticleInformation>({
      query: ({ id }) => ({
        url: getAPIUserEndpoint({ type: "articles", values: [id] }),
        method: "DELETE",
      }),
    }),
  }),
});

export const getAllArticles = profileApi.endpoints.getAllArticles.initiate;
export const getAllArticlesForUser = profileApi.endpoints.getAllArticlesForUser.initiate;
export const getArticleById = profileApi.endpoints.getArticleById.initiate;
export const changeArticle = profileApi.endpoints.changeArticle.initiate;
export const deleteArticle = profileApi.endpoints.deleteArticle.initiate;
