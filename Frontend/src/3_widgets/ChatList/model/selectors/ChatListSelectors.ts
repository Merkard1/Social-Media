import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useChatList, getChatList] = buildSelector(
  (state: StateSchema) => state.chatList?.chats || [],
);
export const [useChatListErorr, getChatListErorr] = buildSelector(
  (state: StateSchema) => state.chatList?.error,
);
export const [useChatListIsLoading, getChatListIsLoading] = buildSelector(
  (state: StateSchema) => state.chatList?.isLoading,
);
export const [useChatListSelectedChatId, getChatListSelectedChatId] = buildSelector(
  (state: StateSchema) => state.chatList?.selectedChatId,
);
