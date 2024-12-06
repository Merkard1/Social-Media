import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
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

    console.log(request);

    const userId = user.id;

    const article = await this.articlesService.findOneById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (!article.user || !article.user.id) {
      throw new ForbiddenException('This article does not have a valid owner.');
    }

    const isOwner = article.user.id === userId;
    const isAdmin = user.roles && user.roles.includes('ADMIN');

    if (isOwner || isAdmin) {
      return true;
    }

    throw new ForbiddenException(
      'You are not authorized to perform this action',
    );
  }
}
