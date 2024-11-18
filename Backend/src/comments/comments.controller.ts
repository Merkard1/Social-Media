import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentOwnerGuard } from './guards/comment-owner.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':articleId')
  async create(
    @Param('articleId') articleId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    const comment = await this.commentsService.create(
      articleId,
      createCommentDto,
      req.user,
    );
    return {
      commentId: comment.id,
      articleId: comment.article.id,
      username: comment.user.username,
      text: comment.text,
    };
  }

  @Get(':id')
  async findCommentById(@Param('id') commentId: string) {
    const comment = await this.commentsService.findById(commentId);
    return {
      id: comment.id,
      text: comment.text,
      username: comment.user.username,
      articleId: comment.article.id,
    };
  }

  @Get('all/:articleId')
  findByArticle(@Param('articleId') articleId: string) {
    return this.commentsService.findByArticle(articleId);
  }

  @UseGuards(AuthGuard('jwt'), CommentOwnerGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentsService.update(
      id,
      updateCommentDto,
    );
    return {
      id: updatedComment.id,
      text: updatedComment.text,
      username: updatedComment.user.username,
      articleId: updatedComment.article.id,
    };
  }

  @UseGuards(AuthGuard('jwt'), CommentOwnerGuard)
  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('all/:articleId')
  async removeAllForArticle(@Param('articleId') articleId: string) {
    const result = await this.commentsService.removeAllForArticle(articleId);
    return result;
  }
}
