import { IsOptional, IsString, Length, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchUsersDto {
  @ApiProperty({ description: 'Search term for usernames', example: 'john' })
  @IsString()
  @Length(1, 50)
  q: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Number of users per page', example: 10 })
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number;
}
