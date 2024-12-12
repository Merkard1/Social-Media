import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Article, { nullable: true })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedNotifications)
  recipient: User;

  @Column({ nullable: true })
  articleId: string;
}
