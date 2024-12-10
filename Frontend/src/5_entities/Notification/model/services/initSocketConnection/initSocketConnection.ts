// src/entities/notification/model/services/initSocketConnection.ts
import { io, Socket } from "socket.io-client";

import { AppDispatch } from "@/1_app/providers/StoreProvider";

import { notificationActions } from "../../slice/NotificationSlice";

let socket: Socket | null = null;

export const initNotificationSocketConnection = (dispatch: AppDispatch) => {
  if (socket) return socket;

  socket = io("http://localhost:5000"); // Your server URL

  socket.on("connect", () => {
    console.log("Connected to notifications socket");
  });

  // Listen for 'comment' events or similar server-side events
  socket.on("comment:new", (data: { articleId: string; comment: string; userId: string }) => {
    dispatch(notificationActions.newCommentNotification(data));
  });

  // Listen for 'message' events if combined here or handle in a separate entity
  socket.on("message:new", (messageData) => {
    dispatch(notificationActions.newMessageNotification(messageData));
  });

  return socket;
};
