import { IsBoolean, IsIn } from 'class-validator';

export class JsonSettingsDto {
  @IsIn(['app_light_theme', 'app_dark_theme'])
  theme: 'app_light_theme' | 'app_dark_theme';

  @IsBoolean()
  isFirstVisit: boolean;

  @IsBoolean()
  settingsPageHasBeenOpen: boolean;

  @IsBoolean()
  isArticlesPageWasOpened: boolean;
}
