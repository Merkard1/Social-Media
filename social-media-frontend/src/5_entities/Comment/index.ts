// API
export {
  useCreateCommentForArticleMutation,
  useDeleteCommentMutation,
  useGetAllCommentsForArticleQuery,
  useUpdateCommentMutation,
  createCommentForArticle,
  getAllCommentsForArticle,
  updateComment,
  deleteComment } from "./api/commentApi";
// Services
export { addCommentForArticle } from "./model/services/addCommentForArticle/addCommentForArticle";
export { fetchCommentsByArticleId } from "./model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
// Model
// Selectors
export {
  getAddCommentContent,
  getAddCommentFormError,
  getAddCommentReadOnly,
  useAddCommentContent,
  useAddCommentFormError,
  useAddCommentReadOnly,

} from "./model/selectors/commentFormSelectors/commentFormSelectors";
export {
  getArticleCommentsIsLoading,
  getArticleCommentsError,
} from "./model/selectors/articleCommentsSelectors/articleCommentsSelectors";

// Slice
export { commentReducer } from "./model/slice";
export { commentFormActions } from "./model/slice/CommentFormSlice";

// Types
export type { CommentSchema } from "./model/types";
export type { Comment } from "./model/types/comment";
// UI
export { CommentList } from "./ui/CommentList/CommentList";
