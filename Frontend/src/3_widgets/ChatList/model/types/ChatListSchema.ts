export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
}

export interface ChatListSchema {
  chats: Chat[];
  selectedChatId: string | null;
  isLoading: boolean;
  error: string | null;
}
