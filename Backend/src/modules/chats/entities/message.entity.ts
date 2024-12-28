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
  @Column()
  @Expose()
  senderId: string;

  @ApiProperty({ example: 'Hello there!' })
  @Column('text')
  @Expose()
  content: string;

  @ApiProperty({ type: () => User })
  @Expose()
  @JoinColumn({ name: 'senderId' })
  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  sender: User;

  @ApiProperty({ type: () => Chat })
  @Expose()
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat;

  @ApiProperty({ example: '2024-12-23T02:35:38.664Z' })
  @CreateDateColumn()
  @Expose()
  createdAt: Date;
}
