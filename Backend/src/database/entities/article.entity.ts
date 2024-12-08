import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { ArticleRating } from './article-rating.entity';
import { ArticleType, BlockType } from '@/utils/types/const';

export class Block {
  id: string;
  type: BlockType;
  title?: string;
  paragraphs?: string[];
  code?: string;
  src?: string;
}

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  img: string;

  @Column('text', { array: true })
  type: ArticleType[];

  @Column({ type: 'jsonb' })
  blocks: Block[];

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  numberOfRatings: number;

  @ManyToOne(() => User, (user) => user.articles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => ArticleRating, (rating) => rating.article)
  ratings: ArticleRating[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
