import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @Expose()
  first?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @Expose()
  lastname?: string;

  @ApiPropertyOptional({ example: 31 })
  @IsOptional()
  @IsInt()
  @Expose()
  age?: number;

  @ApiPropertyOptional({ example: 'EUR' })
  @IsOptional()
  @IsString()
  @Expose()
  currency?: string;

  @ApiPropertyOptional({ example: 'Germany' })
  @IsOptional()
  @IsString()
  @Expose()
  country?: string;

  @ApiPropertyOptional({ example: 'Berlin' })
  @IsOptional()
  @IsString()
  @Expose()
  city?: string;

  @ApiPropertyOptional({ example: 'https://example.com/new-avatar.jpg' })
  @IsOptional()
  @IsString()
  @Expose()
  avatar?: string;
}
