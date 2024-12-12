import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { BlockDto } from './dto/article-block.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ParseJsonPipe } from '@/common/pipes/parse-json.pipe';
import { ArticleType } from './types/ArticleType';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Article } from '@/modules/articles/entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Create a new article
   */
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({
    status: 201,
    description: 'Article created successfully',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Article creation payload',
    type: CreateArticleDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body('title') title: string,
    @Body('subtitle') subtitle: string,
    @Body('type', ParseJsonPipe) type: ArticleType[],
    @Body('blocks', ParseJsonPipe) blocks: BlockDto[],
    @Request() req,
    @UploadedFile() file?: Express.MulterS3File,
  ) {
    const userId = req.user.id;
    const createArticleDto: CreateArticleDto = {
      title,
      subtitle,
      type,
      blocks,
      img: file ? file.location : null,
    };
    return this.articlesService.create(createArticleDto, userId);
  }

  /**
   * Get all articles with support for query parameters
   */
  @ApiOperation({ summary: 'Retrieve all articles' })
  @ApiResponse({
    status: 200,
    description: 'List of articles retrieved successfully',
    type: [Article],
  })
  @Get()
  async findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  /**
   * Get a single article by ID
   */
  @ApiOperation({ summary: 'Retrieve an article by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Article retrieved successfully',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOneById(id);
    return article;
  }

  /**
   * Update an existing article
   */
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiResponse({
    status: 200,
    description: 'Article updated successfully',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Article update payload',
    type: UpdateArticleDto,
  })
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('subtitle') subtitle: string,
    @Body('type', ParseJsonPipe) type: ArticleType[],
    @Body('blocks', ParseJsonPipe) blocks: BlockDto[],
    @Request() req,
    @UploadedFile() file?: Express.MulterS3File,
  ) {
    const updateArticleDto: UpdateArticleDto = {
      title,
      subtitle,
      type,
      blocks,
    };

    if (file) {
      updateArticleDto.img = file.location;
    }

    try {
      const updatedArticle = await this.articlesService.update(
        id,
        updateArticleDto,
      );
      return {
        message: 'Article updated successfully',
        article: updatedArticle,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update the article',
        error,
      );
    }
  }

  /**
   * Delete an article by ID
   */
  @ApiOperation({ summary: 'Delete an article by its ID' })
  @ApiResponse({
    status: 204,
    description: 'Article deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.articlesService.remove(id);
  }

  /**
   * Remove image from an article
   */
  @ApiOperation({ summary: 'Remove image from an article' })
  @ApiResponse({
    status: 200,
    description: 'Image removed successfully',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Delete(':id/image')
  async removeArticleImage(@Param('id') id: string) {
    try {
      const updatedArticle = await this.articlesService.setImage(id, null);
      return {
        message: 'Image removed successfully',
        article: updatedArticle,
      };
    } catch (error) {
      throw new InternalServerErrorException('Image removal failed', error);
    }
  }
}
