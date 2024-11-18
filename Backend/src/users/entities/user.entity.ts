import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Article } from '../../articles/entities/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ArticleRating } from '../../article-ratings/entities/article-rating.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Exclude } from 'class-transformer';

export type Role = 'ADMIN' | 'USER' | 'MANAGER';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column('simple-array', { default: 'USER' })
  roles: Role[];

  @Column('jsonb', { nullable: true })
  features: Record<string, any>;

  @Column('jsonb', { nullable: true })
  jsonSettings: {
    theme: 'app_light_theme' | 'app_dark_theme';
    isFirstVisit: boolean;
    settingsPageHasBeenOpen: boolean;
    isArticlesPageWasOpened: boolean;
  };

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
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
