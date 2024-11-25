import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommentsService } from '../comments.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const commentId = request.params.commentId;

    if (!commentId) {
      throw new NotFoundException('Comment ID not provided in the request');
    }

    const comment = await this.commentsService.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    }

    return true;
  }
}
