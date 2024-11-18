import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleRating } from './entities/article-rating.entity';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticleRatingService {
  constructor(
    @InjectRepository(ArticleRating)
    private readonly articleRatingRepository: Repository<ArticleRating>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async rateArticle(
    articleId: string,
    user: User,
    rating: number,
    feedback?: string,
  ) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    let articleRating = await this.articleRatingRepository.findOne({
      where: { article: { id: articleId }, user: { id: user.id } },
    });

    if (!articleRating) {
      // Create a new rating with feedback
      articleRating = this.articleRatingRepository.create({
        article,
        user,
        rating,
        feedback,
      });
    } else {
      // Update the existing rating and feedback
      articleRating.rating = rating;
      if (feedback !== undefined) {
        articleRating.feedback = feedback;
      }
    }

    await this.articleRatingRepository.save(articleRating);
    return {
      message: 'Rating and feedback saved successfully',
      rating: articleRating.rating,
      feedback: articleRating.feedback,
    };
  }

  async getAverageRating(articleId: string) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const { avg } = await this.articleRatingRepository
      .createQueryBuilder('articleRating')
      .where('articleRating.article = :articleId', { articleId })
      .select('AVG(articleRating.rating)', 'avg')
      .getRawOne();

    return { averageRating: parseFloat(avg).toFixed(2) };
  }

  async getFeedbackForArticle(articleId: string) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const feedbacks = await this.articleRatingRepository.find({
      where: { article: { id: articleId } },
      relations: ['user'],
      select: ['feedback', 'user'],
    });

    return feedbacks.map((feedback) => ({
      username: feedback.user.username,
      feedback: feedback.feedback,
    }));
  }
}
