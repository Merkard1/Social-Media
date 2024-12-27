//
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import { User } from '@/modules/users/entities/user.entity'; // Adjust path if needed
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @ApiProperty({ example: '88f51fa9-0edc-4d45-80eb-fea33f35ee26' })
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'a3e30b4b-658f-49aa-bd5f-5847406bb167' })
  @Expose()
  @Column()
  senderId: string;

  @ApiProperty({ example: 'Hello there!' })
  @Expose()
  @Column('text')
  content: string;

  @ApiProperty({ type: () => User })
  @Expose()
  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ApiProperty({ type: () => Chat })
  @Expose()
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat;

  @ApiProperty({ example: '2024-12-23T02:35:38.664Z' })
  @Expose()
  @CreateDateColumn()
  createdAt: Date;
}
