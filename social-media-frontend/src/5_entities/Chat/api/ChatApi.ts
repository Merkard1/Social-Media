import { Message } from "@/5_entities/Message";

import rtkApi from "@/6_shared/api/rtkApi";

import { Chat } from "../model/types/ChatSchema";

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Fetch all chats for the authenticated user.
     * GET /chats
     */
    fetchChatsApi: build.query<Chat[], void>({
      query: () => ({
        url: "/chats",
      }),
      providesTags: (result) =>
        (result
          ? [
            ...result.map(({ id }) => ({ type: "Chat" as const, id })),
            { type: "Chat", id: "LIST" },
          ]
          : [{ type: "Chat", id: "LIST" }]),
    }),

    /**
     * Create a new chat with a specified participant.
     * POST /chats/initiate
     */
    createChatApi: build.mutation<Chat, { recipientId: string }>({
      query: (body) => ({
        url: "/chats/initiate",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),

    /**
     * Delete a chat by ID.
     * DELETE /chats/:chatId
     */
    deleteChatApi: build.mutation<{ message: string }, string>({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, chatId) => [{ type: "Chat", id: chatId }],
    }),

    /**
     * Fetch all messages from a specific chat.
     * GET /chats/:chatId/messages
     */
    fetchMessagesApi: build.query<Message[], string>({
      query: (chatId) => ({
        url: `/chats/${chatId}/messages`,
      }),
      providesTags: (result, error, chatId) =>
        (result
          ? [
            ...result.map(({ id }) => ({ type: "Message" as const, id })),
            { type: "Message", id: `LIST-${chatId}` },
          ]
          : [{ type: "Message", id: `LIST-${chatId}` }]),
    }),

    /**
     * Send a new message within a specific chat.
     * POST /chats/:chatId/messages
     */
    sendMessageApi: build.mutation<Message, { chatId: string; content: string }>({
      query: ({ chatId, content }) => ({
        url: `/chats/${chatId}/messages`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: "Message", id: `LIST-${chatId}` }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateChatApiMutation,
  useDeleteChatApiMutation,
  useFetchChatsApiQuery,
  useFetchMessagesApiQuery,
  useSendMessageApiMutation,
} = articleApi;

export const createChatApi = articleApi.endpoints.createChatApi.initiate;
export const deleteChatApi = articleApi.endpoints.deleteChatApi.initiate;
export const fetchChatsApi = articleApi.endpoints.fetchChatsApi.initiate;
export const fetchMessagesApi = articleApi.endpoints.fetchMessagesApi.initiate;
export const sendMessageApi = articleApi.endpoints.sendMessageApi.initiate;
