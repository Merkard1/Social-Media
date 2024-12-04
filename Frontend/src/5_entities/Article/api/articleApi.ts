import rtkApi from "@/6_shared/api/rtkApi";

import { ArticleDetailsResponse } from "../model/types/article";
import { ArticleUpsert } from "../model/types/articleUpsertSchema";

interface GetArticleByIdParams {
  id: string;
}

interface ChangeArticleParams {
  id: string;
  articleData: Partial<ArticleDetailsResponse>;
}

interface DeleteArticleParams {
  id: string;
}

interface GetAllArticlesParams {
  params?: any;
}

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({

    getAllArticles: build.query<ArticleDetailsResponse[], GetAllArticlesParams >({
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

    getArticleById: build.query<ArticleDetailsResponse, GetArticleByIdParams>({
      query: ({ id }) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Article", id }],
    }),

    createArticle: build.mutation<ArticleDetailsResponse, ArticleUpsert>({
      query: (articleData) => ({
        url: "/articles",
        method: "POST",
        body: articleData,
      }),
      invalidatesTags: (result, error) => [{ type: "Article" }],
    }),

    changeArticle: build.mutation<ArticleDetailsResponse, ChangeArticleParams>({
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
  useCreateArticleMutation,
  useChangeArticleMutation,
  useDeleteArticleMutation,
} = articleApi;

export const getAllArticles = articleApi.endpoints.getAllArticles.initiate;
export const getArticleById = articleApi.endpoints.getArticleById.initiate;
export const createArticle = articleApi.endpoints.createArticle.initiate;
export const changeArticle = articleApi.endpoints.changeArticle.initiate;
export const deleteArticle = articleApi.endpoints.deleteArticle.initiate;
