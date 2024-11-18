import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Article } from '../../articles/entities/article.entity';

@Entity()
export class ArticleRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  feedback?: string;

  @ManyToOne(() => User, (user) => user.username, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Article, (article) => article.ratings, {
    onDelete: 'CASCADE',
  })
  article: Article;
}
