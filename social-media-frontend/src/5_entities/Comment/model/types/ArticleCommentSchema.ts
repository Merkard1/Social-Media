import { EntityState } from "@reduxjs/toolkit";

import { Comment } from "./comment";

export interface ArticleCommentsSchema extends EntityState<Comment> {
    isLoading: boolean;
    error?: string;
  }
