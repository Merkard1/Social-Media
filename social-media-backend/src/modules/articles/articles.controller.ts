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
  ApiTags,
} from '@nestjs/swagger';
import { Article } from '@/modules/articles/entities/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  private readonly logger = new Logger(ArticlesController.name);

  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @ApiBody({
    description: 'Payload for creating an article',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Introduction to NestJS' },
        subtitle: {
          type: 'string',
          example: 'Building efficient server-side applications',
        },
        type: {
          type: 'string',
          description: 'JSON string of ArticleType[]',
          example: '["IT", "SCIENCE"]',
        },
        blocks: {
          type: 'string',
          description: 'JSON string of BlockDto[]',
          example:
            '[{"type":"TEXT","title":"Introduction","paragraphs":["Paragraph 1"]}]',
        },
        image: { type: 'string', format: 'binary' },
        'blockImages[]': { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({
    status: 201,
    description: 'Article successfully created',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error in the request payload',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
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

  @ApiOperation({ summary: 'Retrieve all articles' })
  @ApiResponse({ status: 200, type: [Article] })
  @Get()
  async findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  @ApiOperation({ summary: 'Retrieve an article by its ID' })
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOneById(id);
  }

  @ApiBearerAuth()
  @ApiBody({
    description: 'Payload for updating an article',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Title' },
        subtitle: { type: 'string', example: 'Updated Subtitle' },
        type: {
          type: 'string',
          description: 'JSON of ArticleType[]',
          example: '["IT"]',
        },
        blocks: {
          type: 'string',
          description: 'JSON of BlockDto[]',
          example: '[{"type":"TEXT","title":"Updated Introduction"}]',
        },
        image: { type: 'string', format: 'binary' },
        'blockImages[]': { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiResponse({
    status: 200,
    description: 'Article updated successfully',
    type: Article,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an article by its ID' })
  @ApiResponse({ status: 204, description: 'Article deleted successfully' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  async remove(@Param('id') id: string) {
    await this.articlesService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove image from an article' })
  @ApiResponse({ status: 200, description: 'Image removed successfully' })
  @Delete(':id/image')
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
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
