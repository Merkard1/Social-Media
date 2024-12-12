import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from './profile.entity';
import { Article } from '../../articles/enteties/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ArticleRating } from '../../article-ratings/entities/article-rating.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Role } from '@/modules/users/types/UserRoles';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('simple-array', { default: 'USER' })
  roles: Role[];

  @Column('jsonb', { nullable: true })
  features: Record<string, any>;

  @Column('jsonb', { nullable: true })
  jsonSettings: {
    theme?: 'app_light_theme' | 'app_dark_theme';
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpened?: boolean;
  };

  @OneToOne(() => Profile, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => ArticleRating, (rating) => rating.user)
  ratings: ArticleRating[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.recipient)
  receivedNotifications: Notification[];
}
