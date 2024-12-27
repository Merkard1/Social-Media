import { Expose } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5-31123-6168a1-09cb',
    description: 'Unique identifier for the profile',
  })
  id: string;

  @Expose()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  first: string;

  @Expose()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastname: string;

  @Expose()
  @ApiProperty({ example: 30, description: 'Age of the user' })
  age: number;

  @Expose()
  @ApiProperty({
    example: 'USD',
    description: 'Currency preference of the user',
  })
  currency: string;

  @Expose()
  @ApiProperty({ example: 'USA', description: 'Country of the user' })
  country: string;

  @Expose()
  @ApiProperty({ example: 'New York', description: 'City of the user' })
  city: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL of the user',
  })
  avatar?: string | null;
}
