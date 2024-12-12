import { Article } from '@/modules/articles/entities/article.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    articleId: string,
    userId: string,
    content: string,
  ): Promise<Comment> {
    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentsRepository.create({
      content,
      article,
      user,
    });

    return this.commentsRepository.save(comment);
  }

  async findCommentsByArticle(articleId: string): Promise<Comment[]> {
    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comments = await this.commentsRepository.find({
      where: { article: { id: articleId } },
      relations: ['user', 'user.profile'],
      order: { createdAt: 'DESC' },
    });

    return comments;
  }

  async updateComment(
    commentId: string,
    userId: string,
    content: string,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this comment',
      );
    }

    comment.content = content;
    return this.commentsRepository.save(comment);
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    await this.commentsRepository.remove(comment);
  }

  async findById(commentId: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'user.profile', 'article'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }
}
