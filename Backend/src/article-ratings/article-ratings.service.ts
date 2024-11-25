import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleRating } from './entities/article-rating.entity';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(ArticleRating)
    private readonly ratingsRepository: Repository<ArticleRating>,
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async rateArticle(
    userId: string,
    articleId: string,
    value: number,
  ): Promise<number> {
    if (value < 1 || value > 5) {
      throw new BadRequestException('Rating value must be between 1 and 5');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
      relations: ['ratings'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    let rating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, article: { id: articleId } },
    });

    if (rating) {
      rating.value = value;
      await this.ratingsRepository.save(rating);
    } else {
      rating = this.ratingsRepository.create({ user, article, value });
      await this.ratingsRepository.save(rating);
      article.numberOfRatings += 1;
    }
    const totalRatings = article.numberOfRatings;

    const sumRatingsResult = await this.ratingsRepository
      .createQueryBuilder('rating')
      .where('rating.articleId = :articleId', { articleId })
      .select('SUM(rating.value)', 'sum')
      .getRawOne();

    const sumRatings = parseInt(sumRatingsResult.sum, 10);

    article.averageRating = parseFloat((sumRatings / totalRatings).toFixed(2));
    await this.articlesRepository.save(article);

    return article.averageRating;
  }

  async hasUserRatedArticle(
    userId: string,
    articleId: string,
  ): Promise<boolean> {
    const rating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, article: { id: articleId } },
    });
    return !!rating;
  }
}
