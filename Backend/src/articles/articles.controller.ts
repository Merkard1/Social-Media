import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { ArticleOwnerGuard } from './guards/article-owner.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Article } from './entities/article.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of articles with optional filters',
  })
  @ApiResponse({
    status: 200,
    description: 'List of articles retrieved successfully.',
    type: [Article],
  })
  findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  @Get('user/:username')
  @ApiOperation({ summary: 'Retrieve articles by a specific user' })
  @ApiResponse({
    status: 200,
    description: 'List of user articles retrieved successfully.',
    type: [Article],
  })
  findByUser(@Param('username') username: string) {
    return this.articlesService.findByUsername(username);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single article by ID' })
  @ApiResponse({
    status: 200,
    description: 'Article retrieved successfully.',
    type: Article,
  })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiBearerAuth()
  async create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    try {
      const user = req.user;
      if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const article = await this.articlesService.create(createArticleDto, user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Article created successfully',
        data: article,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiResponse({
    status: 200,
    description: 'Article updated successfully.',
    type: Article,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Request() req,
  ) {
    const updatedArticle = await this.articlesService.update(
      id,
      updateArticleDto,
      req.user,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Article updated successfully',
      data: updatedArticle,
    };
  }

  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove an article by ID' })
  @ApiResponse({ status: 204, description: 'Article removed successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.articlesService.remove(id, req.user);
    return;
  }
}
