import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRating } from './entities/article-rating.entity';
import { Article } from '../articles/entities/article.entity';
import { ArticleRatingService } from './article-ratings.service';
import { ArticleRatingController } from './article-ratings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRating, Article])],
  providers: [ArticleRatingService],
  controllers: [ArticleRatingController],
})
export class ArticleRatingsModule {}
