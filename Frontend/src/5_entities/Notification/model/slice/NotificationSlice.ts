/* eslint-disable no-param-reassign */

import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { NotificationType } from "../types/notification";

interface Notification {
  id: string;
  type: NotificationType;
  payload: any;
  read: boolean;
  createdAt: number;
}

interface NotificationState {
  list: Notification[];
}

const initialState: NotificationState = {
  list: [],
};

const notificationSlice = buildSlice({
  name: "notificationSlice",
  initialState: null,
  reducers: {
    addNotification: (state, action: PayloadAction<any>) => { },
    newCommentNotification: (
      state,
      action: PayloadAction<{ articleId: string; comment: string; userId: string }>,
    ) => {
    },
    newMessageNotification: (
      state,
      action: PayloadAction<{ fromUser: string; messageText: string }>,
    ) => {
    },
    markAllAsRead: (state) => {
    },
  },
});

export const {
  actions: notificationActions,
  reducer: notificationReducer,
} = notificationSlice;
