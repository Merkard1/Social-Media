import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity()
export class Profile {
  @ApiProperty({ example: '60d0fe4f5311236168a109ca' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John' })
  @Column({ nullable: true, default: '' })
  @IsString()
  @Expose()
  first: string;

  @ApiProperty({ example: 'Doe' })
  @Column({ nullable: true, default: '' })
  @IsString()
  @Expose()
  lastname: string;

  @ApiProperty({ example: 30 })
  @Column({ nullable: true, default: 0 })
  @IsNumber()
  @Expose()
  age: number;

  @ApiProperty({ example: 'USD' })
  @Column({ nullable: true, default: '' })
  @IsString()
  @Expose()
  currency: string;

  @ApiProperty({ example: 'USA' })
  @Column({ nullable: true, default: '' })
  @IsString()
  @Expose()
  country: string;

  @ApiProperty({ example: 'New York' })
  @Column({ nullable: true, default: '' })
  @IsString()
  @Expose()
  city: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @Column({ nullable: true })
  @IsString()
  @Expose()
  avatar: string;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;
}
