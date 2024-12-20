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

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join:chat')
  handleJoinChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId);
    console.log(`Client ${client.id} joined chat room: ${chatId}`);
  }

  @SubscribeMessage('leave:chat')
  handleLeaveChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(chatId);
    console.log(`Client ${client.id} left chat room: ${chatId}`);
  }

  @SubscribeMessage('message:send')
  async handleMessageSend(
    @MessageBody() messageData: any,
    @ConnectedSocket() client: Socket,
  ) {
    const savedMessage = {
      ...messageData,
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
    };
    this.server.to(messageData.chatId).emit('message:received', savedMessage);
    return savedMessage;
  }

  @SubscribeMessage('messages:load')
  async handleMessagesLoad(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId } = data;
    const messages = [
      {
        id: '1',
        senderId: 'user1',
        content: 'Hello',
        chatId,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        senderId: 'user2',
        content: 'Hi there!',
        chatId,
        createdAt: new Date().toISOString(),
      },
    ];

    client.emit('messages:loaded', messages);
  }

  @SubscribeMessage('message:update')
  async handleMessageUpdate(@MessageBody() updatedMessage: any) {
    this.server
      .to(updatedMessage.chatId)
      .emit('message:updated', updatedMessage);
  }

  @SubscribeMessage('message:delete')
  async handleMessageDelete(
    @MessageBody() data: { id: string; chatId: string },
  ) {
    const { id, chatId } = data;
    this.server.to(chatId).emit('message:deleted', id);
  }
}
