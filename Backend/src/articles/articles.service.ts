import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userId: string,
  ): Promise<Article> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = this.articlesRepository.create({
      ...createArticleDto,
      user,
    });
    return this.articlesRepository.save(article);
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

    const queryBuilder: SelectQueryBuilder<Article> = this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user');

    // Updated to handle array type
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

    const articles = await queryBuilder.getMany();

    return articles;
  }

  async findOneById(id: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'ratings'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    article.views = article.views + 1;

    await this.articlesRepository.save(article);

    return article;
  }

  async update(
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articlesRepository.update(articleId, updateArticleDto);
    return this.articlesRepository.findOne({ where: { id: articleId } });
  }

  async remove(articleId: string): Promise<void> {
    await this.articlesRepository.delete(articleId);
  }
}
