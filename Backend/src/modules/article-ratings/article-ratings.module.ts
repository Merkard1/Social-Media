import { Module } from '@nestjs/common';
import { RatingsService } from './article-ratings.service';
import { RatingsController } from './article-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ArticleRating } from './entities/article-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRating, Article, User])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class ArticleRatingsModule {}
