import { AboutPage } from "@/2_pages/AboutPage";
import { AdminPanelPage } from "@/2_pages/AdminPanelPage";
import { ArticleDetailsPage } from "@/2_pages/ArticleDetailsPage";
import { ArticlesPage } from "@/2_pages/ArticlesPage";
import { ChatPage } from "@/2_pages/ChatPage";
import { ForbiddenPage } from "@/2_pages/ForbiddenPage";
import { MainPage } from "@/2_pages/MainPage";
import { NotFoundPage } from "@/2_pages/NotFoundPage";
import { ProfilePage } from "@/2_pages/ProfilePage";
import { SettingsPage } from "@/2_pages/SettingsPage";
import { UpsertArticlePage } from "@/2_pages/UpsertArticlePage";

import { AppRoutes, getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteChat,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
  getRouteSettings } from "@/6_shared/const/router";

import { AppRoutesProps } from "./routeType";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    preload: [
      () => import("@/2_pages/AboutPage/ui/AboutPage.async"),
      () => import("@/2_pages/ProfilePage/ui/ProfilePage.async"),
      () => import("@/2_pages/UpsertArticlePage/ui/UpsertArticlePage.async"),
    ],
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
    preload: [
      () => import("@/2_pages/MainPage/ui/MainPage.async"),
      () => import("@/2_pages/ProfilePage/ui/ProfilePage.async"),
      () => import("@/2_pages/UpsertArticlePage/ui/UpsertArticlePage.async"),
    ],
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(":username"),
    element: <ProfilePage />,
    authOnly: true,
    preload: [
      () => import("@/2_pages/MainPage/ui/MainPage.async"),
      () => import("@/2_pages/ChatPage/ui/ChatPage.async"),
      () => import("@/2_pages/UpsertArticlePage/ui/UpsertArticlePage.async"),
    ],
  },
  [AppRoutes.CHAT]: {
    path: getRouteChat(),
    element: <ChatPage />,
    authOnly: true,
    preload: [
      () => import("@/2_pages/ProfilePage/ui/ProfilePage.async"),
      () => import("@/2_pages/UpsertArticlePage/ui/UpsertArticlePage.async"),
    ],
  },
  // Articles
  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
    preload: [
      () => import("@/2_pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.async"),
    ],
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: getRouteArticleDetails(":id"),
    element: <ArticleDetailsPage />,
    authOnly: true,
    preload: [
      () => import("@/2_pages/UpsertArticlePage/ui/UpsertArticlePage.async"),
    ],
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <UpsertArticlePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(":id"),
    element: <UpsertArticlePage />,
    authOnly: true,
  },

  // Additional
  [AppRoutes.SETTINGS]: {
    path: getRouteSettings(),
    element: <SettingsPage />,
    authOnly: true,
  },

  // Admin only
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdmin(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: ["ADMIN", "MANAGER"],
  },

  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
    authOnly: true,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: "/*",
    element: <NotFoundPage />,
  },
};
