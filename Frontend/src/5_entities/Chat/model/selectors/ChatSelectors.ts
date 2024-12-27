import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useChatsList, getChatsList] = buildSelector(
  (state: StateSchema) => state.chat?.chats || [],
);
export const [useChatsIsLoading, getChatsIsLoading] = buildSelector(
  (state: StateSchema) => state.chat?.isLoading || false,
);
export const [useChatsError, getChatsError] = buildSelector(
  (state: StateSchema) => state.chat?.error || undefined,
);
export const [useChatsSelectedChat, getChatsSelectedChat] = buildSelector(
  (state: StateSchema) => state.chat?.selectedChat || null,
);

export const [useMessages, getMessages] = buildSelector(
  (state: StateSchema) => state.chat?.selectedChat?.messages || [],
);

export const selectMessagesByChatId = (state: any, chatId: string) => {
  const chat = state.chat.chats.find((c: any) => c.id === chatId);
  return chat ? chat.messages : [];
};
