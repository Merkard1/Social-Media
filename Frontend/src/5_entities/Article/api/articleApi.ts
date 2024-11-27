import rtkApi from "@/6_shared/api/rtkApi";

import { Article } from "../model/types/article";

interface GetArticlesByUserParams {
  username: string;
  params?: any;
}

interface GetArticleByIdParams {
  id: string;
}

interface ChangeArticleParams {
  id: string;
  articleData: Partial<Article>;
}

interface DeleteArticleParams {
  id: string;
}

interface GetAllArticlesParams {
  params?: any;
}

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({

    getAllArticles: build.query<Article[], GetAllArticlesParams >({
      query: ({ params }) => ({
        url: "/articles/",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        (result
          ? [
            ...result.map(({ id }) => ({ type: "Article" as const, id })),
            { type: "Article", id: "LIST" },
          ]
          : [{ type: "Article", id: "LIST" }]),
    }),

    getArticleById: build.query<Article, GetArticleByIdParams>({
      query: ({ id }) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Article", id }],
    }),

    changeArticle: build.mutation<Article, ChangeArticleParams>({
      query: ({ id, articleData }) => ({

        url: `/articles/${id}`,
        method: "PATCH",
        body: articleData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Article", id }],
    }),

    deleteArticle: build.mutation<{ success: boolean }, DeleteArticleParams>({
      query: ({ id }) => ({

        url: `/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Article", id }],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useChangeArticleMutation,
  useDeleteArticleMutation,
} = articleApi;

export const getAllArticles = articleApi.endpoints.getAllArticles.initiate;
export const getArticleById = articleApi.endpoints.getArticleById.initiate;
export const changeArticle = articleApi.endpoints.changeArticle.initiate;
export const deleteArticle = articleApi.endpoints.deleteArticle.initiate;
