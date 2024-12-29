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

export type newBlockType = TextBlock | CodeBlock;

export interface TextBlock extends Block {
  id: string;
  // type: 'TEXT';
  title: string;
  paragraphs?: string[];
}

export interface CodeBlock {
  id: string;
  type: 'CODE';
  code: string;
}

export interface ImageBlock {
  id: string;
  type: 'IMAGE';
  src: string;
}
