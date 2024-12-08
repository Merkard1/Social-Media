import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { JsonSettingsDto } from './json-settings.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  repeatPassword: string;

  @IsIn(['USER', 'ADMIN', 'MANAGER'], { each: true })
  @IsOptional()
  roles?: ('USER' | 'ADMIN' | 'MANAGER')[];

  @IsOptional()
  jsonSettings?: JsonSettingsDto;
}
