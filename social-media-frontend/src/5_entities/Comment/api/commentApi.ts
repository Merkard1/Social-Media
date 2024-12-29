import rtkApi from "@/6_shared/api/rtkApi";

import { Comment } from "../model/types/comment";

export interface CreateCommentPayload {
  articleId: string;
  content: string;
}

export interface UpdateCommentPayload {
  articleId: string;
  commentId: string;
  content: string;
}

export interface DeleteCommentPayload {
  articleId: string;
  commentId: string;
}

export interface GetAllCommentsPayload {
  articleId: string;
}

const commentApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createCommentForArticle: build.mutation<Comment, CreateCommentPayload>({
      query: ({ articleId, content }) => ({
        url: `/articles/${articleId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: "Comment", id: `LIST_${articleId}` },
      ],
    }),

    getAllCommentsForArticle: build.query<Comment[], string>({
      query: (articleId) => ({
        url: `/articles/${articleId}/comments`,
        method: "GET",
      }),
      providesTags: (result, error, articleId) => [
        { type: "Comment", id: `LIST_${articleId}` },
        ...(result
          ? result.map(({ id }) => ({ type: "Comment" as const, id }))
          : []),
      ],
    }),

    updateComment: build.mutation<Comment, UpdateCommentPayload>({
      query: ({ articleId, commentId, content }) => ({
        url: `/articles/${articleId}/comments/${commentId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId },
      ],
    }),

    deleteComment: build.mutation<{ success: boolean }, DeleteCommentPayload>({
      query: ({ articleId, commentId }) => ({
        url: `/articles/${articleId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { commentId, articleId }) => [
        { type: "Comment", id: commentId },
        { type: "Comment", id: `LIST_${articleId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateCommentForArticleMutation } = commentApi;
export const { useGetAllCommentsForArticleQuery } = commentApi;
export const { useUpdateCommentMutation } = commentApi;
export const { useDeleteCommentMutation } = commentApi;

export const createCommentForArticle = commentApi.endpoints.createCommentForArticle.initiate;
export const getAllCommentsForArticle = commentApi.endpoints.getAllCommentsForArticle.initiate;
export const updateComment = commentApi.endpoints.updateComment.initiate;
export const deleteComment = commentApi.endpoints.deleteComment.initiate;
