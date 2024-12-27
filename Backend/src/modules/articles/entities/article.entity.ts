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
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { BlockType } from '../types/ArticleBlock';
import { ArticleType } from '../types/ArticleType';
import { ArticleRating } from '../../article-ratings/entities/article-rating.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Block {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Unique identifier for the block',
  })
  @Expose()
  @Column()
  id: string;

  @ApiProperty({
    example: 'TEXT',
    enum: ['TEXT', 'IMAGE', 'CODE'],
    description: 'Type of the block',
  })
  @Expose()
  @Column()
  type: BlockType;

  @ApiPropertyOptional({
    example: 'Introduction',
    description: 'Title of the block, if applicable',
  })
  @Expose()
  @Column({ nullable: true })
  title?: string;

  @ApiPropertyOptional({
    example: ['This is the first paragraph.', 'This is the second paragraph.'],
    description: 'Paragraphs contained within the block',
  })
  @Expose()
  @Column('text', { array: true, nullable: true })
  paragraphs?: string[];

  @ApiPropertyOptional({
    example: "console.log('Hello, World!');",
    description: 'Code snippet contained within the block, if applicable',
  })
  @Expose()
  @Column({ nullable: true })
  code?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Source URL for the image block, if applicable',
  })
  @Expose()
  @Column({ nullable: true })
  src?: string;
}

@Entity()
export class Article {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Unique identifier for the article',
  })
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Understanding NestJS',
    description: 'Title of the article',
  })
  @Expose()
  @Column()
  title: string;

  @ApiProperty({
    example:
      'A comprehensive guide to building scalable server-side applications.',
    description: 'Subtitle or brief description of the article',
  })
  @Expose()
  @Column()
  subtitle: string;

  @ApiPropertyOptional({
    example: 'https://example.com/article-image.jpg',
    description: 'URL of the main image for the article, if any',
  })
  @Expose()
  @Column({ nullable: true })
  image?: string;

  @ApiProperty({
    example: ['technology', 'education'],
    enum: ['technology', 'education', 'lifestyle'],
    isArray: true,
    description: 'Categories or types associated with the article',
  })
  @Expose()
  @Column('text', { array: true })
  type: ArticleType[];

  @ApiProperty({
    type: [Block],
    description: 'Array of content blocks that make up the article',
  })
  @Expose()
  @Column({ type: 'jsonb' })
  blocks: Block[];

  @ApiProperty({
    example: 150,
    description: 'Number of views the article has received',
  })
  @Expose()
  @Column({ default: 0 })
  views: number;

  @ApiProperty({
    example: 4.5,
    description: 'Average rating of the article',
  })
  @Expose()
  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @ApiProperty({
    example: 30,
    description: 'Total number of ratings the article has received',
  })
  @Expose()
  @Column({ default: 0 })
  numberOfRatings: number;

  @ApiProperty({
    type: () => User,
    description: 'User who authored the article',
  })
  @Expose()
  @ManyToOne(() => User, (user) => user.articles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiPropertyOptional({
    type: () => [Comment],
    description: 'Comments associated with the article',
  })
  @Expose()
  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ApiPropertyOptional({
    type: () => [ArticleRating],
    description: 'Ratings associated with the article',
  })
  @Expose()
  @OneToMany(() => ArticleRating, (rating) => rating.article)
  ratings: ArticleRating[];

  @ApiProperty({
    example: '2023-10-12T07:20:50.52Z',
    type: 'string',
    format: 'date-time',
    description: 'Timestamp when the article was created',
  })
  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-12T07:30:50.52Z',
    type: 'string',
    format: 'date-time',
    description: 'Timestamp when the article was last updated',
  })
  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
