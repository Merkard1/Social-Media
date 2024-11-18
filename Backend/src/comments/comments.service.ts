import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(
    articleId: string,
    createCommentDto: CreateCommentDto,
    user: User,
  ) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = this.commentRepository.create({
      text: createCommentDto.text,
      user,
      article,
    });

    await this.commentRepository.save(comment);

    // Return the full comment entity with relations
    return this.commentRepository.findOne({
      where: { id: comment.id },
      relations: ['user', 'article'],
    });
  }

  // Find comments by article ID
  async findByArticle(articleId: string) {
    return this.commentRepository.find({
      where: { article: { id: articleId } },
      relations: ['user'],
      select: {
        id: true,
        text: true,
        user: { username: true },
      },
    });
  }

  // Find a specific comment by its ID
  async findById(commentId: string): Promise<Comment | null> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'article'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<any> {
    // Update the comment
    await this.commentRepository.update(id, updateCommentDto);

    // Fetch the updated comment with only necessary fields
    const updatedComment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'article'], // Include related user and article entities
      select: {
        id: true,
        text: true,
        user: { username: true },
        article: { id: true },
      },
    });

    if (!updatedComment) {
      throw new NotFoundException('Comment not found');
    }

    return updatedComment;
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Comment not found');
    }
  }

  async removeAllForArticle(
    articleId: string,
  ): Promise<{ message: string; deletedCount: number }> {
    const comments = await this.commentRepository.find({
      where: { article: { id: articleId } },
    });

    if (comments.length === 0) {
      throw new NotFoundException('No comments found for this article');
    }

    const result = await this.commentRepository.delete({
      article: { id: articleId },
    });

    return {
      message: 'All comments for the article have been successfully deleted',
      deletedCount: result.affected || 0,
    };
  }
}
