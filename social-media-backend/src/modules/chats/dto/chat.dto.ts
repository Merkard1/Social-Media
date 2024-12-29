import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class ChatDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty({ isArray: true })
  @Expose()
  participants: any[];

  @ApiProperty({ type: () => [MessageDto] })
  @Expose()
  @Type(() => MessageDto)
  messages: MessageDto[];
}
