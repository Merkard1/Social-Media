import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Profile } from '@/modules/profiles/entities/profile.entity';
import { Article } from '@/modules/articles/entities/article.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { Notification } from '@/modules/notifications/entities/notification.entity';
import { Role } from '@/modules/users/types/UserRoles';
import { ArticleRating } from '@/modules/article-ratings/entities/article-rating.entity';
import { Chat } from '@/modules/chats/entities/chat.entity';
import { Message } from '@/modules/chats/entities/message.entity';

import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
} from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty({ example: '60d0fe4f5-31123-6168a1-09cb' })
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'merkard' })
  @Column({ unique: true })
  @Expose()
  username: string;

  @ApiProperty({ example: 'merkard@example.com' })
  @Column({ unique: true })
  @Expose()
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: ['USER'],
    enum: ['USER', 'ADMIN', 'MANAGER'],
    description: 'Roles assigned to the user',
  })
  @Column('simple-array', { default: 'USER' })
  @Expose()
  roles: Role[];

  @ApiPropertyOptional({
    example: { darkMode: true, betaAccess: false },
    description: 'Feature flags for the user',
  })
  @Column('jsonb', { nullable: true })
  @Expose()
  features: Record<string, any>;

  @ApiPropertyOptional({
    example: {
      theme: 'app_dark_theme',
      isFirstVisit: false,
      settingsPageHasBeenOpen: false,
      isArticlesPageWasOpened: false,
    },
    description: 'JSON settings for the user',
  })
  @Column('jsonb', { nullable: true })
  @Expose()
  jsonSettings: {
    theme?: string;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpened?: boolean;
  };

  @ApiPropertyOptional({ type: () => Profile })
  @Expose()
  @JoinColumn()
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @ApiPropertyOptional({ type: () => [Article] })
  @Expose()
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ApiPropertyOptional({ type: () => [Comment] })
  @Expose()
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ApiPropertyOptional({ type: () => [ArticleRating] })
  @Expose()
  @OneToMany(() => ArticleRating, (rating) => rating.user)
  ratings: ArticleRating[];

  @ManyToMany(() => Chat, (chat) => chat.participants)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @ApiPropertyOptional({ type: () => [Notification] })
  @Expose()
  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @ApiPropertyOptional({ type: () => [Notification] })
  @Expose()
  @OneToMany(() => Notification, (notification) => notification.recipient)
  receivedNotifications: Notification[];
}
