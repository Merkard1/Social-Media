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
import { Expose } from 'class-transformer';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'Introduction to NestJS',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Subtitle of the article',
    example: 'Building efficient server-side applications',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiPropertyOptional({
    description: 'Image URL of the article',
    example: 'https://example.com/image.png',
  })
  @Expose()
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiProperty({
    description: 'Types/categories of the article',
    example: ['IT', 'SCIENCE'],
    enum: ['IT', 'ECONOMICS', 'SCIENCE'],
    isArray: true,
  })
  @Expose()
  @IsArray()
  @IsString({ each: true })
  type: ArticleType[];

  @ApiProperty({
    description: 'Content blocks of the article',
    type: [BlockDto],
  })
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  @ArrayNotEmpty()
  blocks: BlockDto[];
}
