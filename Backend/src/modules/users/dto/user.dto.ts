import { Expose, Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from '@/modules/profiles/dto/profile.dto';

export class UserDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5-31123-6168a1-09cb',
    description: 'Unique identifier for the user',
  })
  id: string;

  @Expose()
  @ApiProperty({ example: 'merkard', description: 'Username of the user' })
  username: string;

  @Expose()
  @ApiProperty({
    example: 'merkard@example.com',
    description: 'Email of the user',
  })
  email: string;

  @Expose()
  @ApiProperty({
    example: ['USER'],
    description: 'Roles assigned to the user',
  })
  roles: string[];

  @Expose()
  @ApiPropertyOptional({
    example: { darkMode: true, betaAccess: false },
    description: 'Feature flags for the user',
  })
  features: Record<string, any>;

  @Expose()
  @ApiPropertyOptional({
    example: {
      theme: 'app_dark_theme',
      isFirstVisit: false,
      settingsPageHasBeenOpen: false,
      isArticlesPageWasOpened: false,
    },
    description: 'JSON settings for the user',
  })
  jsonSettings: {
    theme?: string;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpened?: boolean;
  };

  @Expose()
  @Type(() => ProfileDto)
  @ApiPropertyOptional({
    type: () => ProfileDto,
    description: 'Profile information of the user',
  })
  profile: ProfileDto;
}
