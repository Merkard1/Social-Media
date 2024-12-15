import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticleOwnerGuard } from './guards/article-owner.guard';
import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import { S3Module } from '../s3/s3.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3ConfigService } from '@/config/s3.config';
import { MulterConfigService } from '@/config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User]),
    MulterModule.registerAsync({
      imports: [S3Module],
      useClass: MulterConfigService,
    }),
    S3Module,
  ],
  providers: [ArticlesService, ArticleOwnerGuard, S3ConfigService],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
