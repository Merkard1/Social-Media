export { CommentList } from "./ui/CommentList/CommentList";
export type { Comment } from "./model/types/comment";

export { useCreateCommentForArticleMutation,
  useDeleteCommentMutation,
  useGetAllCommentsForArticleQuery,
  useUpdateCommentMutation,
  createCommentForArticle,
  getAllCommentsForArticle,
  updateComment,
  deleteComment } from "./api/commentsApi";
