import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJsonSettingsDto {
  @ApiPropertyOptional({
    example: 'app_light_theme',
    description: 'Theme setting',
  })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Indicates if it is the user's first visit",
  })
  @IsBoolean()
  @IsOptional()
  isFirstVisit?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Indicates if the articles page was opened',
  })
  @IsBoolean()
  @IsOptional()
  isArticlesPageWasOpened?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the settings page has been opened',
  })
  @IsBoolean()
  @IsOptional()
  settingsPageHasBeenOpen?: boolean;
}
