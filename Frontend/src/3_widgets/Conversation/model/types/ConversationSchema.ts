export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  chatId: string;
}

export interface ConversationSchema {
  messages: Message[];
  isLoading: boolean;
  currentMessage: string;
  error: string | null;
}
