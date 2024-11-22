import { User } from "@/5_entities/User";

import { ArticleBlockType, ArticleType } from "../consts/articleConsts";

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: "CODE";
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: "IMAGE";
  src: string;
  title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: "TEXT";
  paragraphs: string[];
  title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
  id: string;
  title: string;
  user: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
