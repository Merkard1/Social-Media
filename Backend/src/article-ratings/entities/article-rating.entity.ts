import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Article } from '../../articles/entities/article.entity';

@Entity('ratings')
@Unique(['user', 'article'])
export class ArticleRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  value: number;

  @ManyToOne(() => User, (user) => user.username, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Article, (article) => article.ratings, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @CreateDateColumn()
  createdAt: Date;
}
