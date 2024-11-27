import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleRatingDto } from './dto/create-article-rating.dto';
import { RatingsService } from './article-ratings.service';
import { HasUserRatedResponseDto } from './dto/has-user-rated-response.dto';
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':articleId')
  async rateArticle(
    @Param('articleId') articleId: string,
    @Body() rateArticleDto: CreateArticleRatingDto,
    @Request() req,
  ) {
    const userId = req.user.userId || req.user.id;
    const { value } = rateArticleDto;
    const averageRating = await this.ratingsService.rateArticle(
      userId,
      articleId,
      value,
    );
    return { averageRating };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':articleId/has-rated')
  async hasUserRated(
    @Param('articleId') articleId: string,
    @Request() req,
  ): Promise<HasUserRatedResponseDto> {
    const userId = req.user.userId || req.user.id;

    const response = await this.ratingsService.getUserRating(userId, articleId);

    return response;
  }

  @Get('average/:articleId')
  async getAverageRating(@Param('articleId') articleId: string) {
    const averageRating = await this.ratingsService.getAverageRating(articleId);
    return { averageRating };
  }
}
