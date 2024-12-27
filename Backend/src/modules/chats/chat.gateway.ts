import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatsService } from './chats.service';
import { plainToInstance } from 'class-transformer';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.emit('error', 'Authentication token missing');
      client.disconnect();
      return;
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      client.data.userId = payload.sub;
      console.log(
        `WS client ${client.id} connected as userId=${client.data.userId}`,
      );
    } catch (err) {
      console.error('Invalid token:', err);
      client.emit('error', 'Invalid token');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`WS client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join:chat')
  async handleJoinChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    if (!userId) {
      client.emit('error', 'Unauthorized');
      return;
    }
    client.join(chatId);
    console.log(`User ${userId} joined chat room: ${chatId}`);
  }

  @SubscribeMessage('message:send')
  async handleMessageSend(
    @MessageBody() data: { recipientId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;
    const { recipientId, content } = data;

    if (!senderId) {
      client.emit('error', 'Unauthorized');
      return;
    }

    try {
      const chat = await this.chatsService.findOrCreateChat(
        senderId,
        recipientId,
      );

      const savedMessage = await this.chatsService.saveMessage(
        chat.id,
        senderId,
        content,
      );

      const messageDto = plainToInstance(MessageDto, savedMessage, {
        excludeExtraneousValues: true,
      });

      const messageWithChatId = { ...messageDto, chatId: chat.id };

      this.server.to(chat.id).emit('message:received', messageWithChatId);

      console.log(`Emitted message: ${JSON.stringify(messageWithChatId)}`);
    } catch (error) {
      console.error('Error sending message:', error);
      client.emit('error', 'Failed to send message');
    }
  }

  @SubscribeMessage('messages:load')
  async handleMessagesLoad(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId } = data;
    const userId = client.data.userId;

    if (!userId) {
      client.emit('error', 'Unauthorized');
      return;
    }

    try {
      const messages = await this.chatsService.findMessagesByChatIdForUser(
        chatId,
        userId,
      );

      const messagesDto = messages.map((msg) =>
        plainToInstance(MessageDto, msg, { excludeExtraneousValues: true }),
      );

      client.emit('messages:loaded', messagesDto);
    } catch (error) {
      console.error('Error loading messages:', error);
      client.emit('error', 'Failed to load messages');
    }
  }
}
