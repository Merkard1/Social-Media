import { IsInt, Max, Min } from 'class-validator';

export class CreateArticleRatingDto {
  @IsInt({ message: 'Rating value must be an integer' })
  @Max(5, { message: 'Rating value must not exceed 5' })
  @Min(1, { message: 'Rating value must be at least 1' })
  value: number;
}
