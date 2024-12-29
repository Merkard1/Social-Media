import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiPropertyOptional({ example: 'John' })
  @Expose()
  @IsOptional()
  @IsString()
  first?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @Expose()
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiPropertyOptional({ example: 31 })
  @Expose()
  @IsInt()
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({ example: 'EUR' })
  @Expose()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: 'Germany' })
  @Expose()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 'Berlin' })
  @Expose()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'https://example.com/new-avatar.jpg' })
  @Expose()
  @IsOptional()
  @IsString()
  avatar?: string;
}
