import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JsonSettingsDto } from './json-settings.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  login?: string;

  @IsArray()
  @IsIn(['USER', 'ADMIN', 'MANAGER'], { each: true })
  @IsOptional()
  roles?: ('USER' | 'ADMIN' | 'MANAGER')[];

  @IsOptional()
  @IsString()
  features?: Record<string, any>;

  @ValidateNested()
  @Type(() => JsonSettingsDto)
  @IsOptional()
  jsonSettings?: JsonSettingsDto;
}
