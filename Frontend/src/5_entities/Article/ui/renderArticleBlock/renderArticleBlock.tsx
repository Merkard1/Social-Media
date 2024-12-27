import { ArticleBlock } from "../../model/types/Article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

interface RenderArticleBlockProps {
  block: ArticleBlock;
  readOnly?: boolean;
  onChange?: (blockId: string, updatedBlock: Partial<ArticleBlock>) => void;
  onDelete?: (blockId: string) => void;
  onImageUpload?: (blockId: string, file: File) => void;
}

export const renderArticleBlock = ({
  block,
  readOnly = true,
  onChange = () => {},
  onDelete = () => {},
  onImageUpload = () => {},
}: RenderArticleBlockProps): JSX.Element | null => {
  switch (block.type) {
  case "CODE":
    return (
      <ArticleCodeBlockComponent
        key={block.id}
        block={block}
        readOnly={readOnly}
        onChange={onChange}
        onDelete={onDelete}
      />
    );
  case "IMAGE":
    return (
      <ArticleImageBlockComponent
        key={block.id}
        block={block}
        readOnly={readOnly}
        onChange={onChange}
        onDelete={onDelete}
        onImageUpload={onImageUpload}
      />
    );
  case "TEXT":
    return (
      <ArticleTextBlockComponent
        key={block.id}
        block={block}
        readOnly={readOnly}
        onChange={onChange}
        onDelete={onDelete}
      />
    );
  default:
    return null;
  }
};
