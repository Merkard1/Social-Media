import { ArticlesService } from '@/modules/articles/articles.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class ArticleOwnerGuard implements CanActivate {
  constructor(private articlesService: ArticlesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const articleId = request.params.id;

    const article = await this.articlesService.findOneById(articleId);

    if (!article) {
      throw new ForbiddenException('Article not found');
    }

    if (article.user.id === user.id || user.roles.includes('ADMIN')) {
      return true;
    }

    throw new ForbiddenException(
      'You are not authorized to perform this action',
    );
  }
}
