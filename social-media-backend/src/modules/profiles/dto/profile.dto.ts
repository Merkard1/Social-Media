import { Expose } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({
    example: '60d0fe4f5-31123-6168a1-09cb',
    description: 'Unique identifier for the profile',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @Expose()
  first: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @Expose()
  lastname: string;

  @ApiProperty({ example: 30, description: 'Age of the user' })
  @Expose()
  age: number;

  @ApiProperty({
    example: 'USD',
    description: 'Currency preference of the user',
  })
  @Expose()
  currency: string;

  @ApiProperty({ example: 'USA', description: 'Country of the user' })
  @Expose()
  country: string;

  @ApiProperty({ example: 'New York', description: 'City of the user' })
  @Expose()
  city: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL of the user',
  })
  @Expose()
  avatar?: string | null;
}
