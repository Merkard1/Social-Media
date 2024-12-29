import { User } from "@/5_entities/User";

export interface Message {
  id: string,
  chatId?: any;
  senderId: string,
  content: string,
  createdAt: string,
  sender: Partial<User>,
}
