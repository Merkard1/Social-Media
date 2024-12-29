import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello from the Nest side...' })
  content: string;
}
