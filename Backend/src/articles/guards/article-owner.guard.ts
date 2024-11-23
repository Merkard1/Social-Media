import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ArticlesService } from '../articles.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ArticleOwnerGuard implements CanActivate {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const articleId = request.params.id;

    try {
      const article = await this.articlesService.findOneById(articleId);

      if (article.user.id === user.id || user.roles.includes('ADMIN')) {
        return true;
      }

      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    } catch (error) {
      // If the error is NotFoundException, let it propagate
      if (error.status === 404) {
        throw error;
      }
      // For any other errors, throw ForbiddenException
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    }
  }
}
