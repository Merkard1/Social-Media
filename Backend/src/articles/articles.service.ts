import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    try {
      const article = this.articlesRepository.create({
        ...createArticleDto,
        user,
      });

      const savedArticle = await this.articlesRepository.save(article);
      this.logger.log(`Article created with ID: ${savedArticle.id}`);
      return savedArticle;
    } catch (error) {
      this.logger.error('Error creating article', error.stack);
      throw new InternalServerErrorException('Failed to create article');
    }
  }

  async findAll(query: any): Promise<Article[]> {
    const {
      _limit = 10,
      _page = 1,
      _sort = 'createdAt',
      _order = 'DESC',
      type,
      q,
    } = query;

    const queryBuilder = this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user');

    if (type && type !== 'ALL') {
      queryBuilder.andWhere('article.type @> :type', { type: `{${type}}` });
    }

    if (q) {
      queryBuilder.andWhere(
        '(article.title ILIKE :q OR article.subtitle ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    queryBuilder
      .orderBy(`article.${_sort}`, _order.toUpperCase() as 'ASC' | 'DESC')
      .skip((_page - 1) * _limit)
      .take(_limit);

    this.logger.log(`Fetching articles with query: ${JSON.stringify(query)}`);

    return queryBuilder.getMany();
  }

  async findByUsername(username: string): Promise<Article[]> {
    this.logger.log(`Fetching articles for user: ${username}`);
    return this.articlesRepository.find({
      where: { user: { username } },
      relations: ['user'],
    });
  }

  async findOneById(id: string): Promise<Article> {
    this.logger.log(`Fetching article by ID: ${id}`);
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!article) {
      this.logger.warn(`Article not found with ID: ${id}`);
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
    user: User,
  ): Promise<Article> {
    this.logger.log(`Updating article with ID: ${id} by user: ${user.id}`);
    const article = await this.findOneById(id);

    if (article.user.id !== user.id && !user.roles.includes('ADMIN')) {
      this.logger.warn(
        `User ${user.id} is not authorized to update article ${id}`,
      );
      throw new ForbiddenException(
        'You are not authorized to update this article',
      );
    }

    if (updateArticleDto.blocks) {
      updateArticleDto.blocks = updateArticleDto.blocks.map((block) => ({
        ...block,
        id: block.id || uuidv4(),
      }));
    }

    Object.assign(article, updateArticleDto);
    return this.articlesRepository.save(article);
  }

  async remove(id: string, user: User): Promise<void> {
    this.logger.log(`Removing article with ID: ${id} by user: ${user.id}`);
    const article = await this.findOneById(id);

    // Ensure the user has permission to delete
    if (article.user.id !== user.id && !user.roles.includes('ADMIN')) {
      this.logger.warn(
        `User ${user.id} is not authorized to delete article ${id}`,
      );
      throw new ForbiddenException(
        'You are not authorized to delete this article',
      );
    }

    await this.articlesRepository.delete(id);
    this.logger.log(`Article with ID: ${id} deleted successfully`);
  }
}
