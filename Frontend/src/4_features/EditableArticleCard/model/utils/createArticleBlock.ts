import { v4 as uuidv4 } from "uuid";

import { ArticleBlock } from "@/5_entities/Article";
import { ArticleCodeBlock,
  ArticleImageBlock, ArticleTextBlock } from "@/5_entities/Article/model/types/article";

export const createArticleBlock = (type: ArticleBlock["type"]): ArticleBlock => {
  switch (type) {
  case "TEXT":
    return {
      id: uuidv4(),
      type: "TEXT",
      title: "",
      paragraphs: [""],
    } as ArticleTextBlock;

  case "CODE":
    return {
      id: uuidv4(),
      type: "CODE",
      code: "",
    } as ArticleCodeBlock;

  case "IMAGE":
    return {
      id: uuidv4(),
      type: "IMAGE",
      src: "",
      title: "",
    } as ArticleImageBlock;

  default:
    throw new Error(`Unsupported block type: ${type}`);
  }
};
