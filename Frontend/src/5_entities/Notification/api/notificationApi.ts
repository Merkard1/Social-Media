import rtkApi from "@/6_shared/api/rtkApi";

import { Notification } from "../model/types/notification";

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      query: () => ({
        url: "/notifications",
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
