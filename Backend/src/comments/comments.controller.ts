import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a new comment for an article
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComment(
    @Param('articleId') articleId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    const userId = req.user.userId || req.user.id;
    const { content } = createCommentDto;
    const comment = await this.commentsService.create(
      articleId,
      userId,
      content,
    );

    return this.transformToResponseDto(comment);
  }

  // Get all comments for an article
  @Get()
  async getComments(
    @Param('articleId') articleId: string,
  ): Promise<CommentResponseDto[]> {
    const comments =
      await this.commentsService.findCommentsByArticle(articleId);
    return comments.map((comment) => this.transformToResponseDto(comment));
  }

  // Update a comment
  @UseGuards(AuthGuard('jwt'))
  @Put(':commentId')
  async updateComment(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    const userId = req.user.userId || req.user.id;
    const { content } = updateCommentDto;
    const updatedComment = await this.commentsService.updateComment(
      commentId,
      userId,
      content,
    );

    return this.transformToResponseDto(updatedComment);
  }

  // Delete a comment
  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId')
  async deleteComment(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Request() req,
  ): Promise<{ message: string }> {
    const userId = req.user.userId || req.user.id;
    await this.commentsService.deleteComment(commentId, userId);
    return { message: 'Comment deleted successfully' };
  }

  // Helper method to transform a Comment entity to CommentResponseDto
  private transformToResponseDto(comment: any): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        username: comment.user.username,
        profile: comment.user.profile,
      },
    };
  }
}
