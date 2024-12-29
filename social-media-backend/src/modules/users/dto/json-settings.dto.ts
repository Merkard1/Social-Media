import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class JsonSettingsDto {
  @ApiPropertyOptional({
    example: 'app_dark_theme',
    enum: ['app_light_theme', 'app_dark_theme'],
    description: 'Theme setting',
  })
  @IsIn(['app_light_theme', 'app_dark_theme'])
  @IsOptional()
  theme?: 'app_light_theme' | 'app_dark_theme';

  @ApiPropertyOptional({
    example: true,
    description: "Indicates if it is the user's first visit",
  })
  @IsBoolean()
  @IsOptional()
  isFirstVisit?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Indicates if the settings page has been opened',
  })
  @IsBoolean()
  @IsOptional()
  settingsPageHasBeenOpen?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the articles page was opened',
  })
  @IsBoolean()
  @IsOptional()
  isArticlesPageWasOpened?: boolean;
}
