export enum BlockType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  CODE = 'CODE',
}

export interface Block {
  id: string;
  type: BlockType;
  title?: string;
  paragraphs?: string[];
  code?: string;
  src?: string;
}
