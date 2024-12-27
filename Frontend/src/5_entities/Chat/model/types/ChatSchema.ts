import { Message } from "@/5_entities/Message";
import { User } from "@/5_entities/User";

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatSchema {
  chats: Chat[],
  selectedChat: Chat | null,
  isLoading: boolean,
  error: string | undefined
}
