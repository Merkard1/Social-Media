import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { Article } from '@/database/entities/article.entity';
import { User } from '@/database/entities/user.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User]), UploadModule],
  providers: [ArticlesService, ArticleOwnerGuard],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
