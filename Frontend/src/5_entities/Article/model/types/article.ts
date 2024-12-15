import { Comment } from "@/5_entities/Comment";
import { Rating } from "@/5_entities/Rating";
import { User } from "@/5_entities/User";

import { Image } from "@/6_shared/ui/ImageUploader";

import { ArticleBlockType, ArticleType } from "../consts/articleConsts";

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  id: string;
  type: "CODE";
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase{
  id: string;
  type: "IMAGE";
  src: string;
  title?: string;
}

export interface ArticleTextBlock extends ArticleBlockBase{
  id: string;
  type: "TEXT";
  paragraphs: string[];
  title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface ArticleDetailsResponse {
  id: string;
  title: string;
  subtitle: string;
  image: Image;

  type: ArticleType[];
  blocks: ArticleBlock[];

  views: number;
  averageRating: number;
  numberOfRatings: number;

  createdAt: string;
  updatedAt: string;

  user: User;
  comments: Comment;
  ratings: Rating;
}

export type ArticleUpdateInput = Omit<
  ArticleDetailsResponse,
  | "id"
  | "views"
  | "averageRating"
  | "numberOfRatings"
  | "createdAt"
  | "updatedAt"
  | "user"
  | "comments"
  | "ratings"
>;
