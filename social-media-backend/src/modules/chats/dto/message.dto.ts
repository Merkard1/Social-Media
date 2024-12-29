import { Type, Expose } from 'class-transformer';
import { UserDto } from '@/modules/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({
    example: 'message-id-uuid',
    description: 'Unique identifier for the message',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Hello!',
    description: 'Content of the message',
  })
  @Expose()
  content: string;

  @ApiProperty({
    example: '2024-12-23T22:39:58.073Z',
    description: 'Timestamp when the message was created',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    type: () => UserDto,
    description: 'Sender of the message',
  })
  @Expose()
  @Type(() => UserDto)
  sender: UserDto;
}
