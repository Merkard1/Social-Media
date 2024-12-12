import { Module } from '@nestjs/common';
import { RatingsService } from './article-ratings.service';
import { RatingsController } from './article-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRating } from '@/modules/article-ratings/entities/article-rating.entity';
import { Article } from '@/modules/articles/enteties/article.entity';
import { User } from '@/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRating, Article, User])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class ArticleRatingsModule {}
