import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatsRepository: Repository<Chat>,

    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOrCreateChat(userId: string, recipientId: string): Promise<Chat> {
    if (userId === recipientId) {
      throw new ForbiddenException('Cannot chat with yourself');
    }

    const users = await this.usersRepository.find({
      where: { id: In([userId, recipientId]) },
    });
    if (users.length !== 2) {
      throw new NotFoundException('One or both users not found');
    }

    const qb = this.chatsRepository
      .createQueryBuilder('chat')
      .select('chat.id', 'chatId')
      .leftJoin('chat.participants', 'p')
      .where('p.id IN (:...ids)', { ids: [userId, recipientId] })
      .groupBy('chat.id')
      .having('COUNT(DISTINCT p.id) = 2');

    const existingChatRaw = await qb.getRawOne<{ chatId: string }>();
    if (existingChatRaw?.chatId) {
      const existingChat = await this.chatsRepository.findOne({
        where: { id: existingChatRaw.chatId },
        relations: ['participants', 'messages', 'messages.sender'],
        order: { messages: { createdAt: 'DESC' } },
      });
      if (existingChat) return existingChat;
    }

    const newChat = this.chatsRepository.create({ participants: users });
    return this.chatsRepository.save(newChat);
  }

  /**
   * Save a message, then re-fetch so we have `sender`.
   */
  async saveMessage(
    chatId: string,
    senderId: string,
    content: string,
  ): Promise<Message> {
    const chat = await this.chatsRepository.findOne({
      where: { id: chatId },
      relations: ['participants'],
    });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const isParticipant = chat.participants.some((p) => p.id === senderId);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this chat');
    }

    const message = this.messagesRepository.create({
      senderId,
      content,
      chat,
    });
    const saved = await this.messagesRepository.save(message);

    const savedWithSender = await this.messagesRepository.findOne({
      where: { id: saved.id },
      relations: ['sender', 'sender.profile'],
    });

    if (!savedWithSender) {
      throw new NotFoundException('Saved message not found');
    }

    return savedWithSender;
  }

  async getAllChatsForUser(userId: string): Promise<Chat[]> {
    return this.chatsRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.participants', 'myself', 'myself.id = :userId', {
        userId,
      })
      .leftJoinAndSelect('chat.participants', 'participant')
      .leftJoinAndSelect('participant.profile', 'profile')
      .leftJoinAndSelect('chat.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('sender.profile', 'senderProfile')
      .orderBy('message.createdAt', 'DESC')
      .getMany();
  }

  async findMessagesByChatIdForUser(
    chatId: string,
    userId: string,
  ): Promise<Message[]> {
    const chat = await this.chatsRepository.findOne({
      where: { id: chatId },
      relations: ['participants'],
    });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    if (!chat.participants.some((p) => p.id === userId)) {
      throw new ForbiddenException('Not a participant');
    }

    return this.messagesRepository.find({
      where: { chat: { id: chatId } },
      relations: ['sender', 'sender.profile'],
      order: { createdAt: 'ASC' },
    });
  }
}
