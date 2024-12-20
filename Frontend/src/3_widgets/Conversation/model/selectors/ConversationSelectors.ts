import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useConversationMessages, getConversationMessages] = buildSelector(
  (state: StateSchema) => state.conversation?.messages || [],
);
export const [useConversationCurrentMessage, getConversationCurrentMessage] = buildSelector(
  (state: StateSchema) => state.conversation?.currentMessage || "",
);
export const [useConversationIsLoading, getConversationIsLoading] = buildSelector(
  (state: StateSchema) => state.conversation?.isLoading,
);
export const [useConversationError, getConversationError] = buildSelector(
  (state: StateSchema) => state.conversation?.error,
);
