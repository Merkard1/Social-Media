import { ArticleBlock } from "./article";

export interface ArticleUpsert {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  type: string[];
  blocks: ArticleBlock[];
  user: {
    id: string;
    username: string;
    avatar?: string | null;
  } | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleUpsertSchema {
  readOnly: boolean;
  isLoading: boolean;
  error?: string;
  validateErrors?: string[];
  form: ArticleUpsert | null;
  initialData: ArticleUpsert | null;
}
