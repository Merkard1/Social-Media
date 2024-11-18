import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from '../comments.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Authenticated user
    const commentId = request.params.id; // Comment ID from the route

    const comment = await this.commentsService.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Debugging information
    console.log('Authenticated User:', user);
    console.log('Comment Owner ID:', comment.user.id);
    console.log('Requester ID:', user.id);
    console.log('User Roles:', user.roles);

    // Ensure the authenticated user matches the comment owner or is an admin
    if (comment.user.id === user.id || user.roles.includes('ADMIN')) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to perform this action',
    );
  }
}
