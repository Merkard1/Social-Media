import { Type, Expose } from 'class-transformer';
import { UserDto } from '@/modules/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @Expose()
  @ApiProperty({
    example: 'message-id-uuid',
    description: 'Unique identifier for the message',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'Hello!',
    description: 'Content of the message',
  })
  content: string;

  @Expose()
  @ApiProperty({
    example: '2024-12-23T22:39:58.073Z',
    description: 'Timestamp when the message was created',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: () => UserDto,
    description: 'Sender of the message',
  })
  @Type(() => UserDto)
  sender: UserDto;
}
