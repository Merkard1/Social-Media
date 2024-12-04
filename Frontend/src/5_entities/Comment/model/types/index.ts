import { ArticleCommentsSchema } from "./ArticleCommentSchema";
import { CommentFormSchema } from "./CommentFormSchema";

export interface CommentSchema {
    articleComments: ArticleCommentsSchema;
    commentForm: CommentFormSchema;
}
