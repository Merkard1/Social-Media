import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BlockType } from '../entities/article.entity';

export class BlockDto {
  @IsOptional()
  @IsString()
  id?: string; // Make id optional or required based on frontend

  @IsString()
  @IsIn(['TEXT', 'IMAGE', 'CODE'])
  type: BlockType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  paragraphs?: string[];

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  src?: string;
}

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks: BlockDto[];
}
