import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsEmail,
  ValidateNested,
  Equals,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { JsonSettingsDto } from './json-settings.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', format: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'StrongPassword123!', format: 'password' })
  @IsString()
  @IsNotEmpty()
  @Equals('password', { message: 'Passwords do not match' })
  repeatPassword: string;

  @ApiPropertyOptional({
    example: ['USER'],
    enum: ['USER', 'ADMIN', 'MANAGER'],
    description: 'Roles assigned to the user',
  })
  @IsIn(['USER', 'ADMIN', 'MANAGER'], { each: true })
  @IsOptional()
  roles?: ('USER' | 'ADMIN' | 'MANAGER')[];

  @ApiPropertyOptional({
    type: () => JsonSettingsDto,
    description: 'JSON settings for the user',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => JsonSettingsDto)
  jsonSettings?: JsonSettingsDto;
}
