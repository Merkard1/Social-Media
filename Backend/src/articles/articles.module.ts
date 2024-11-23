import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UsersModule],
  providers: [ArticlesService, ArticleOwnerGuard],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
