import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import { S3Module } from '../s3/s3.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User]),
    MulterModule.register({
      dest: './uploads',
    }),
    S3Module,
  ],
  providers: [ArticlesService, ArticleOwnerGuard],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
