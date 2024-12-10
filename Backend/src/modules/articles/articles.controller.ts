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
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@/config/multer.config';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Create a new article
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    const userId = req.user.userId || req.user.id;
    const article = await this.articlesService.create(createArticleDto, userId);
    return article;
  }

  // Get all articles with support for query parameters
  @Get()
  async findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  // Get a single article by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOneById(id);
    return article;
  }

  // Update an article
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  // Delete an article
  @UseGuards(AuthGuard('jwt'), ArticleOwnerGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.articlesService.remove(id);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadArticleImage(
    @UploadedFile() file: Express.MulterS3File,
    @Body('articleId') articleId: string,
  ) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    try {
      const imageUrl = file.location;
      const updatedArticle = await this.articlesService.setImage(
        articleId,
        imageUrl,
      );
      return {
        message: 'Image uploaded successfully',
        article: updatedArticle,
      };
    } catch (error) {
      throw new InternalServerErrorException('Image upload failed', error);
    }
  }
}
