import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'recipient-user-id-uuid' })
  recipientId: string;
}
