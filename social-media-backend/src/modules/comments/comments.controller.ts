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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new comment for an article' })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully created',
    type: CommentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Article or user not found' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
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

  @ApiOperation({ summary: 'Retrieve all comments for an article' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved comments',
    type: [CommentResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @Get()
  async getComments(
    @Param('articleId') articleId: string,
  ): Promise<CommentResponseDto[]> {
    const comments =
      await this.commentsService.findCommentsByArticle(articleId);
    return comments.map((comment) => this.transformToResponseDto(comment));
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully updated',
    type: CommentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized to update comment' })
  @Put(':commentId')
  @UseGuards(AuthGuard('jwt'))
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully deleted',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Comment deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized to delete comment' })
  @Delete(':commentId')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Request() req,
  ): Promise<{ message: string }> {
    const userId = req.user.userId || req.user.id;
    await this.commentsService.deleteComment(commentId, userId);
    return { message: 'Comment deleted successfully' };
  }

  private transformToResponseDto(comment: any): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        username: comment.user.username,
      },
    };
  }
}
