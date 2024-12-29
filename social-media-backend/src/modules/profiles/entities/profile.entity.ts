import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity()
export class Profile {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'Unique ID of the profile',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @Column({ nullable: true, default: '' })
  @Expose()
  @IsString()
  first: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @Column({ nullable: true, default: '' })
  @Expose()
  @IsString()
  lastname: string;

  @ApiProperty({ example: 30, description: 'Age of the user' })
  @Column({ nullable: true, default: 0 })
  @Expose()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'USD',
    description: 'Preferred currency of the user',
  })
  @Column({ nullable: true, default: '' })
  @Expose()
  @IsString()
  currency: string;

  @ApiProperty({ example: 'USA', description: 'Country of the user' })
  @Column({ nullable: true, default: '' })
  @Expose()
  @IsString()
  country: string;

  @ApiProperty({ example: 'New York', description: 'City of the user' })
  @Column({ nullable: true, default: '' })
  @Expose()
  @IsString()
  city: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar image URL',
  })
  @Column({ nullable: true })
  @Expose()
  @IsString()
  avatar: string;

  @ApiProperty({
    type: () => User,
    description: 'User associated with the profile',
  })
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;
}
