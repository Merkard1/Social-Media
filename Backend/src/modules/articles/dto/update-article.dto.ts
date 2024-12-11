import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { BlockDto } from './article-block.dto';
import {
  IsArray,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ArticleType } from '../types/ArticleType';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiPropertyOptional({
    description: 'Title of the article',
    example: 'Updated Introduction to NestJS',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Subtitle of the article',
    example: 'Enhancing server-side applications with NestJS',
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional({
    description: 'Image URL of the article',
    example: 'https://example.com/new-image.png',
  })
  @IsOptional()
  @IsString()
  img?: string | null;

  @ApiPropertyOptional({
    description: 'Types/categories of the article',
    example: ['IT', 'SCIENCE'],
    enum: ['IT', 'ECONOMICS', 'SCIENCE'],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  type?: ArticleType[];

  @ApiPropertyOptional({
    description: 'Content blocks of the article',
    type: [BlockDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks?: BlockDto[];
}
