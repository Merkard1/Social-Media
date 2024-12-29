import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Article } from '@/modules/articles/entities/article.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { User } from '@/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article, User])],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
