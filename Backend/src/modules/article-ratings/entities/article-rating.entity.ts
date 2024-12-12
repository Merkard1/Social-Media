import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('ratings')
@Unique(['user', 'article'])
export class ArticleRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  value: number;

  @ManyToOne(() => User, (user) => user.ratings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Article, (article) => article.ratings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  article: Article;

  @CreateDateColumn()
  createdAt: Date;
}
