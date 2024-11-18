// src/articles/articles.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    const article = this.articlesRepository.create({
      ...createArticleDto,
      user,
    });
    console.log('Saving article:', article);
    await this.articlesRepository.insert(article);
    return article;
  }

  async findAll(): Promise<Article[]> {
    return this.articlesRepository.find({
      relations: ['user'],
    });
  }

  async findByUsername(username: string): Promise<Article[]> {
    return await this.articlesRepository.find({
      where: { user: { username } },
      relations: ['user'],
    });
  }

  async findOneById(id: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto, user: User) {
    console.log('Updating article with ID:', id);
    console.log('Update data:', updateArticleDto);
    console.log('User performing update:', user);

    const article = await this.articlesRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!article) {
      throw new NotFoundException(
        'Article not found or you do not have permission',
      );
    }

    Object.assign(article, updateArticleDto);
    return this.articlesRepository.save(article);
  }

  async remove(id: string, user: User): Promise<void> {
    const article = await this.findOneById(id);

    if (article.user.id !== user.id && !user.roles.includes('ADMIN')) {
      throw new ForbiddenException(
        'You are not authorized to delete this article',
      );
    }

    await this.articlesRepository.delete(id);
  }
}
