import { Image } from "@/6_shared/ui/ImageUploader";

import { ArticleBlock } from "./article";

export interface ArticleUpsert {
  id: string;
  title: string;
  subtitle: string;
  image: Image;

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
  isLoading: boolean;
  error?: string;
  validateErrors?: string[];
  form: ArticleUpsert | null;
  initialData: ArticleUpsert | null;
  blockImages: Record<string, File>;
}
