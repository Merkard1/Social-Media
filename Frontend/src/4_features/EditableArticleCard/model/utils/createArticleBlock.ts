import { ArticleBlock } from "@/5_entities/Article";
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from "@/5_entities/Article/model/types/article";

export const createArticleBlock = (type: ArticleBlock["type"]): ArticleBlock => {
  const id = Date.now().toString();
  switch (type) {
  case "TEXT":
    return { id, type, title: "", paragraphs: [""] } as ArticleTextBlock;
  case "CODE":
    return { id, type, code: "" } as ArticleCodeBlock;
  case "IMAGE":
    return { id, type, src: "", title: "" } as ArticleImageBlock;
  default:
    throw new Error(`Unsupported block type: ${type}`);
  }
};
