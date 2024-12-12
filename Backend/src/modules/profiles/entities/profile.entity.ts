import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Profile {
  @ApiProperty({ example: '60d0fe4f5311236168a109ca' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John' })
  @Column({ nullable: true, default: '' })
  first: string;

  @ApiProperty({ example: 'Doe' })
  @Column({ nullable: true, default: '' })
  lastname: string;

  @ApiProperty({ example: 30 })
  @Column({ nullable: true, default: 0 })
  age: number;

  @ApiProperty({ example: 'USD' })
  @Column({ nullable: true, default: '' })
  currency: string;

  @ApiProperty({ example: 'USA' })
  @Column({ nullable: true, default: '' })
  country: string;

  @ApiProperty({ example: 'New York' })
  @Column({ nullable: true, default: '' })
  city: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;
}
