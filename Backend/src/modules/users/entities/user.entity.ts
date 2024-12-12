import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from '../../profiles/entities/profile.entity';
import { Article } from '../../articles/entities/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Role } from '@/modules/users/types/UserRoles';
import { ArticleRating } from '@/modules/article-ratings/entities/article-rating.entity';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
} from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: '60d0fe4f5311236168a109cb' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'johndoe' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @Column({ unique: true })
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
  roles: Role[];

  @ApiPropertyOptional({
    example: { darkMode: true, betaAccess: false },
    description: 'Feature flags for the user',
  })
  @Column('jsonb', { nullable: true })
  features: Record<string, any>;

  @ApiPropertyOptional({
    description: 'JSON settings for the user',
  })
  @Column('jsonb', { nullable: true })
  jsonSettings: {
    theme?: 'app_light_theme' | 'app_dark_theme';
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpened?: boolean;
  };

  @ApiPropertyOptional({ type: () => Profile })
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @ApiPropertyOptional({ type: () => [Article] })
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ApiPropertyOptional({ type: () => [Comment] })
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ApiPropertyOptional({ type: () => [ArticleRating] })
  @OneToMany(() => ArticleRating, (rating) => rating.user)
  ratings: ArticleRating[];

  @ApiPropertyOptional({ type: () => [Notification] })
  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @ApiPropertyOptional({ type: () => [Notification] })
  @OneToMany(() => Notification, (notification) => notification.recipient)
  receivedNotifications: Notification[];
}

