import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JsonSettingsDto } from './json-settings.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'john_doe_updated' })
  @IsString()
  username: string;

  @ApiPropertyOptional({ example: 'john.doe.updated@example.com' })
  @IsString()
  email: string;

  @ApiPropertyOptional({
    example: ['USER', 'ADMIN'],
    enum: ['USER', 'ADMIN', 'MANAGER'],
    description: 'Roles assigned to the user',
  })
  @IsArray()
  @IsIn(['USER', 'ADMIN', 'MANAGER'], { each: true })
  @IsOptional()
  roles?: ('USER' | 'ADMIN' | 'MANAGER')[];

  @ApiPropertyOptional({
    example: { darkMode: true, betaAccess: false },
    description: 'Feature flags for the user',
  })
  @IsOptional()
  @IsString()
  features?: Record<string, any>;

  @ApiPropertyOptional({
    type: () => JsonSettingsDto,
    description: 'JSON settings for the user',
  })
  @IsOptional()
  @Type(() => JsonSettingsDto)
  @ValidateNested()
  jsonSettings?: JsonSettingsDto;
}
