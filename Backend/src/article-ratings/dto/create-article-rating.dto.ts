import { IsInt, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleRatingDto {
  @IsInt()
  @IsNotEmpty()
  rate: number;

  @IsString()
  @IsOptional()
  feedback?: string;
}
