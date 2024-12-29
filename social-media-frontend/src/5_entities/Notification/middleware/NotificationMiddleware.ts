import { Middleware } from "@reduxjs/toolkit";

import { RootState } from "@/1_app/providers/StoreProvider/config/store";

import socketService from "@/6_shared/api/socketService";

import { notificationActions } from "../model/slice/NotificationSlice";

interface SocketAction {
  type: string;
  payload?: any;
}

const notificationMiddleware: Middleware<{}, RootState> = (storeAPI) => (next) => (action: SocketAction) => {
  switch (action.type) {
  case "auth/loginSuccess": {
    const handleNotificationReceived = (notification: Notification) => {
      storeAPI.dispatch(notificationActions.addNotification(notification));
    };

    socketService.on("notification:received", handleNotificationReceived);

    const handleLogout = () => {
      socketService.off("notification:received", handleNotificationReceived);
    };
    // storeAPI.subscribe(() => {
    //   const state = storeAPI.getState();
    //   if (!state) {
    //     handleLogout();
    //   }
    // });
    break;
  }

  case "auth/logout": {
    break;
  }
  default:
    break;
  }

  return next(action);
};

export default notificationMiddleware;
