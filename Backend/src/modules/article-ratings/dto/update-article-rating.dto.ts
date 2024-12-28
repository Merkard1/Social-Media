import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateArticleRatingDto {
  @IsInt()
  @Max(5)
  @Min(1)
  rating: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
