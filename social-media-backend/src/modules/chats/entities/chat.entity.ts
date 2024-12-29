import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/users/entities/user.entity'; // Adjust path if needed
import { Message } from './message.entity';

@Entity()
export class Chat {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => [User] })
  @Expose()
  @JoinTable({
    name: 'chat_participants',
    joinColumn: { name: 'chatId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  @ManyToMany(() => User, (user) => user.chats, { cascade: true })
  participants: User[];

  @ApiProperty({ type: () => [Message] })
  @Expose()
  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];

  @ApiProperty({ example: '2024-12-23T02:33:17.086Z' })
  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2024-12-23T02:33:17.086Z' })
  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
