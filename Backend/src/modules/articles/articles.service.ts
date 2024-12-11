import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '@/database/entities/article.entity';
import { User } from '@/database/entities/user.entity';
import { S3 } from 'aws-sdk';
import { S3ConfigService } from '@/config/s3.config';

@Injectable()
export class ArticlesService {
  private s3: S3;
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly s3ConfigService: S3ConfigService,
  ) {
    this.s3 = new S3({
      accessKeyId: this.s3ConfigService.accessKeyId,
      secretAccessKey: this.s3ConfigService.secretAccessKey,
      region: this.s3ConfigService.region,
    });
  }

  private async deleteImageFromS3(imageUrl: string): Promise<void> {
    try {
      const url = new URL(imageUrl);
      const key = decodeURIComponent(url.pathname.substring(1));

      await this.s3
        .deleteObject({
          Bucket: this.s3ConfigService.bucketName,
          Key: key,
        })
        .promise();

      this.logger.log(`Deleted image from S3: ${imageUrl}`);
    } catch (error) {
      this.logger.error('Failed to delete image from S3:', error.stack);
    }
  }

  async create(
    createArticleDto: CreateArticleDto,
    userId: string,
  ): Promise<Article> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = this.articlesRepo.create({
      title: createArticleDto.title,
      subtitle: createArticleDto.subtitle,
      img: createArticleDto.img ?? null,
      type: createArticleDto.type,
      blocks: createArticleDto.blocks,
      user,
    });

    return this.articlesRepo.save(article);
  }

  async findAll(query: any): Promise<Article[]> {
    const {
      _limit = 10,
      _page = 1,
      _sort = 'createdAt',
      _order = 'DESC',
      _type = 'ALL',
      q,
    } = query;

    const skip = (_page - 1) * _limit;
    const take = Number(_limit);

    const validSortFields = ['views', 'createdAt', 'title'];
    const sortField = validSortFields.includes(_sort) ? _sort : 'createdAt';
    const sortOrder = _order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const queryBuilder: SelectQueryBuilder<Article> = this.articlesRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user');

    if (_type && _type.toUpperCase() !== 'ALL') {
      queryBuilder.andWhere(':type = ANY (article.type)', { type: _type });
    }

    if (q) {
      queryBuilder.andWhere(
        '(article.title ILIKE :q OR article.subtitle ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    queryBuilder.orderBy(`article.${sortField}`, sortOrder as 'ASC' | 'DESC');
    queryBuilder.skip(skip).take(take);

    return queryBuilder.getMany();
  }

  async findOneById(id: string): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id },
      relations: ['user', 'comments', 'ratings'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    article.views += 1;
    await this.articlesRepo.save(article);

    return article;
  }

  async update(
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    if (updateArticleDto.img && updateArticleDto.img !== article.img) {
      if (article.img) {
        await this.deleteImageFromS3(article.img);
      }
      this.logger.log(`Setting new image for article ID: ${articleId}`);
    }

    Object.assign(article, updateArticleDto);

    await this.articlesRepo.save(article);

    const updatedArticle = await this.articlesRepo.findOne({
      where: { id: articleId },
      relations: ['user', 'comments', 'ratings'],
    });

    if (!updatedArticle) {
      throw new NotFoundException('Article not found after update');
    }

    return updatedArticle;
  }

  async setImage(articleId: string, imageUrl: string | null): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (imageUrl === null && article.img) {
      await this.deleteImageFromS3(article.img);
      this.logger.log(`Removed image for article ID: ${articleId}`);
    }

    article.img = imageUrl;
    return this.articlesRepo.save(article);
  }

  async remove(articleId: string): Promise<void> {
    await this.articlesRepo.delete(articleId);
    this.logger.log(`Deleted article ID: ${articleId}`);
  }
}
