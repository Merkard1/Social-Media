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
  InternalServerErrorException,
  Logger,
  UploadedFiles,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { BlockDto } from './dto/article-block.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
  private readonly logger = new Logger(ArticlesController.name);
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Create a new article
   */
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, type: Article })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Article creation payload',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        type: { type: 'string', description: 'JSON string of ArticleType[]' },
        blocks: { type: 'string', description: 'JSON string of BlockDto[]' },
        image: { type: 'string', format: 'binary' },
        'blockImages[]': { type: 'string', format: 'binary' },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'blockImages', maxCount: 20 },
    ]),
  )
  async create(
    @Body('title') title: string,
    @Body('subtitle') subtitle: string,
    @Body('type', ParseJsonPipe) type: ArticleType[],
    @Body('blocks', ParseJsonPipe) blocks: BlockDto[],
    @Request() req,
    @UploadedFiles()
    files: {
      image?: Express.MulterS3File[];
      blockImages?: Express.MulterS3File[];
    },
  ) {
    const userId = req.user.id;
    const createArticleDto: CreateArticleDto = {
      title,
      subtitle,
      type,
      blocks,
    };

    return this.articlesService.createArticleWithImages(
      createArticleDto,
      userId,
      files,
    );
  }

  /**
   * Get all articles with support for query parameters
   */
  @ApiOperation({ summary: 'Retrieve all articles' })
  @ApiResponse({ status: 200, type: [Article] })
  @Get()
  async findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  /**
   * Get a single article by ID
   */
  @ApiOperation({ summary: 'Retrieve an article by its ID' })
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 404 })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOneById(id);
  }

  /**
   * Update an existing article
   */
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiResponse({ status: 200, description: 'Article updated successfully' })
  @ApiResponse({ status: 404 })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Article update payload',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        type: { type: 'string', description: 'JSON of ArticleType[]' },
        blocks: { type: 'string', description: 'JSON of BlockDto[]' },
        image: { type: 'string', format: 'binary' },
        'blockImages[]': { type: 'string', format: 'binary' },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'blockImages', maxCount: 20 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('subtitle') subtitle: string,
    @Body('type', ParseJsonPipe) type: ArticleType[],
    @Body('blocks', ParseJsonPipe) blocks: BlockDto[],
    @Request() req,
    @UploadedFiles()
    files: {
      image?: Express.MulterS3File[];
      blockImages?: Express.MulterS3File[];
    },
  ) {
    const updateArticleDto: UpdateArticleDto = {
      title,
      subtitle,
      type,
      blocks,
    };

    try {
      const updatedArticle = await this.articlesService.updateArticleWithImages(
        id,
        updateArticleDto,
        files,
      );
      return {
        message: 'Article updated successfully',
        article: updatedArticle,
      };
    } catch (error) {
      this.logger.error('Update Article Error:', error.stack);
      throw new InternalServerErrorException('Failed to update the article');
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
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Delete(':id/image')
  async removeArticleImage(@Param('id') id: string) {
    try {
      const updatedArticle = await this.articlesService.setImage(id, null);
      return { message: 'Image removed successfully', article: updatedArticle };
    } catch (error) {
      this.logger.error(
        `Failed to remove image for article ID: ${id}`,
        error.stack,
      );
      throw new InternalServerErrorException('Image removal failed', error);
    }
  }
}
