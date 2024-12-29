import { Comment } from '@/modules/comments/entities/comment.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@/modules/articles/entities/article.entity';

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

  /**
   * Create a new comment for a specific article.
   * @param articleId - ID of the article.
   * @param userId - ID of the user creating the comment.
   * @param content - Content of the comment.
   * @returns The created comment.
   */
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

  /**
   * Retrieve all comments for a specific article.
   * @param articleId - ID of the article.
   * @returns A list of comments.
   */
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

  /**
   * Update a specific comment.
   * @param commentId - ID of the comment to update.
   * @param userId - ID of the user attempting to update the comment.
   * @param content - New content for the comment.
   * @returns The updated comment.
   */
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

  /**
   * Delete a specific comment.
   * @param commentId - ID of the comment to delete.
   * @param userId - ID of the user attempting to delete the comment.
   */
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

  /**
   * Retrieve a specific comment by ID.
   * @param commentId - ID of the comment to retrieve.
   * @returns The requested comment.
   */
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
