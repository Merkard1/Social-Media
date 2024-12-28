import { BlockType } from '../types/ArticleBlock';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

export class BlockDto {
  @ApiPropertyOptional({
    description: 'Unique identifier for the block',
    example: '1',
  })
  @Expose()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Type of the block',
    example: 'TEXT',
    enum: ['TEXT', 'IMAGE', 'CODE'],
  })
  @Expose()
  @IsIn(['TEXT', 'IMAGE', 'CODE'])
  @IsString()
  type: BlockType;

  @ApiPropertyOptional({
    description: 'Title of the block',
    example: 'Introduction',
  })
  @Expose()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Content paragraphs for text blocks',
    example: [
      'JavaScript has evolved significantly over the past year.',
      "In this block, we'll explore the latest features and updates.",
    ],
    type: [String],
  })
  @Expose()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  paragraphs?: string[];

  @ApiPropertyOptional({
    description: 'Code snippet for code blocks',
    example: "console.log('Hello, world!');",
  })
  @Expose()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Image source URL for image blocks',
    example: 'https://example.com/image.png',
  })
  @Expose()
  @IsOptional()
  @IsString()
  src?: string;
}
