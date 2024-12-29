import { Expose, Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from '@/modules/profiles/dto/profile.dto';

export class UserDto {
  @ApiProperty({
    example: '60d0fe4f5-31123-6168a1-09cb',
    description: 'Unique identifier for the user',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'merkard', description: 'Username of the user' })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'merkard@example.com',
    description: 'Email of the user',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: ['USER'],
    description: 'Roles assigned to the user',
  })
  @Expose()
  roles: string[];

  @ApiPropertyOptional({
    example: { darkMode: true, betaAccess: false },
    description: 'Feature flags for the user',
  })
  @Expose()
  features: Record<string, any>;

  @ApiPropertyOptional({
    example: {
      theme: 'app_dark_theme',
      isFirstVisit: false,
      settingsPageHasBeenOpen: false,
      isArticlesPageWasOpened: false,
    },
    description: 'JSON settings for the user',
  })
  @Expose()
  jsonSettings: {
    theme?: string;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpened?: boolean;
  };

  @ApiPropertyOptional({
    type: () => ProfileDto,
    description: 'Profile information of the user',
  })
  @Expose()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
