import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';
import { ArticleRating } from './entities/article-rating.entity';

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

    const [user, article] = await Promise.all([
      this.usersRepository.findOne({ where: { id: userId } }),
      this.articlesRepository.findOne({ where: { id: articleId } }),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    let rating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, article: { id: articleId } },
    });

    if (rating) {
      rating.value = value;
    } else {
      rating = this.ratingsRepository.create({
        user,
        article,
        value,
      });
      article.numberOfRatings += 1;
    }

    await this.ratingsRepository.save(rating);

    const { avg } = await this.ratingsRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.value)', 'avg')
      .where('rating.articleId = :articleId', { articleId })
      .getRawOne();

    const avgNumber = parseFloat(avg);
    article.averageRating = parseFloat(avgNumber.toFixed(2));

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

  async getAverageRating(articleId: string): Promise<number> {
    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article.averageRating;
  }
}
