import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ArticleRatingService } from './article-ratings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('article-ratings')
export class ArticleRatingController {
  constructor(private readonly articleRatingService: ArticleRatingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':articleId')
  async rateArticle(
    @Param('articleId') articleId: string,
    @Body('rating') rating: number,
    @Body('feedback') feedback: string,
    @Request() req,
  ) {
    const user = req.user;
    return await this.articleRatingService.rateArticle(
      articleId,
      user,
      rating,
      feedback,
    );
  }

  @Get(':articleId/average')
  async getAverageRating(@Param('articleId') articleId: string) {
    return await this.articleRatingService.getAverageRating(articleId);
  }

  @Get(':articleId/feedback')
  async getFeedbackForArticle(@Param('articleId') articleId: string) {
    return await this.articleRatingService.getFeedbackForArticle(articleId);
  }
}
