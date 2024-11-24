import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateJsonSettingsDto {
  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsBoolean()
  isFirstVisit?: boolean;

  @IsOptional()
  @IsBoolean()
  isArticlesPageWasOpened?: boolean;

  @IsOptional()
  @IsBoolean()
  settingsPageHasBeenOpen?: boolean;
}
