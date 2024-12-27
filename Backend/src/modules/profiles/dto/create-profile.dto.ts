import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateProfileDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  first: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  lastname: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Expose()
  age: number;

  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  currency: string;

  @ApiProperty({ example: 'USA' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  country: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  city: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  @Expose()
  avatar?: string;
}
