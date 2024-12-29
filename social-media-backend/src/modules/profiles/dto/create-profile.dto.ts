import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateProfileDto {
  @ApiProperty({ example: 'John' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  first: string;

  @ApiProperty({ example: 'Doe' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ example: 30 })
  @Expose()
  @IsInt()
  age: number;

  @ApiProperty({ example: 'USD' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({ example: 'USA' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'New York' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @Expose()
  @IsOptional()
  @IsString()
  avatar?: string;
}
