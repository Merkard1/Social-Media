import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleType } from '../types/ArticleType';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BlockDto } from './article-block.dto';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'Introduction to NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Subtitle of the article',
    example: 'Building efficient server-side applications',
  })
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiPropertyOptional({
    description: 'Image URL of the article',
    example: 'https://example.com/image.png',
  })
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiProperty({
    description: 'Types/categories of the article',
    example: ['IT', 'SCIENCE'],
    enum: ['IT', 'ECONOMICS', 'SCIENCE'],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  type: ArticleType[];

  @ApiProperty({
    description: 'Content blocks of the article',
    type: [BlockDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  @ArrayNotEmpty()
  blocks: BlockDto[];
}
