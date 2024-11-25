import { IsInt, Max, Min } from 'class-validator';

export class CreateArticleRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  value: number;
}
