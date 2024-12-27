//
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ChatsService } from './chats.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageDto } from './dto/message.dto';

@ApiTags('Chats')
@Controller('chats')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all chats for the authenticated user' })
  @ApiResponse({ status: 200, type: [ChatDto] })
  async getAllChats(@Req() req): Promise<ChatDto[]> {
    const userId = req.user.id;
    const chats = await this.chatsService.getAllChatsForUser(userId);
    return plainToInstance(ChatDto, chats, { excludeExtraneousValues: true });
  }

  @Post('initiate')
  @ApiOperation({ summary: 'Initiate a new chat' })
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ status: 201, type: ChatDto })
  async initiateChat(
    @Body() createChatDto: CreateChatDto,
    @Request() req,
  ): Promise<ChatDto> {
    const userId = req.user.id;
    const chat = await this.chatsService.findOrCreateChat(
      userId,
      createChatDto.recipientId,
    );
    return plainToInstance(ChatDto, chat, { excludeExtraneousValues: true });
  }

  @Get(':chatId/messages')
  @ApiOperation({ summary: 'Get all messages from a specific chat' })
  @ApiResponse({ status: 200, type: [MessageDto] })
  async getAllMessages(
    @Param('chatId') chatId: string,
    @Req() req,
  ): Promise<MessageDto[]> {
    const userId = req.user.id;
    const messages = await this.chatsService.findMessagesByChatIdForUser(
      chatId,
      userId,
    );
    return plainToInstance(MessageDto, messages, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':chatId/messages')
  @ApiOperation({ summary: 'Send a new message within a chat' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 201, type: MessageDto })
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() dto: CreateMessageDto,
    @Req() req,
  ): Promise<MessageDto> {
    const userId = req.user.id;
    const message = await this.chatsService.saveMessage(
      chatId,
      userId,
      dto.content,
    );
    return plainToInstance(MessageDto, message, {
      excludeExtraneousValues: true,
    });
  }
}
