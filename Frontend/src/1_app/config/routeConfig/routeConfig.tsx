import { AboutPage } from "@/2_pages/AboutPage";
import { AdminPanelPage } from "@/2_pages/AdminPanelPage";
import { ArticleDetailsPage } from "@/2_pages/ArticleDetailsPage";
import { ArticlePage } from "@/2_pages/ArticlePage";
import { ArticlesPage } from "@/2_pages/ArticlesPage";
import { ForbiddenPage } from "@/2_pages/ForbiddenPage";
import { MainPage } from "@/2_pages/MainPage";
import { MessagesPage } from "@/2_pages/MessagesPage";
import { NotFoundPage } from "@/2_pages/NotFoundPage";
import { ProfilePage } from "@/2_pages/ProfilePage";
import { SettingsPage } from "@/2_pages/SettingsPage";

import { AppRoutes, getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteMessages,
  getRouteProfile,
  getRouteSettings } from "@/6_shared/const/router";

import { AppRoutesProps } from "./routeType";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(":username"),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.MESSAGES]: {
    path: getRouteMessages(),
    element: <MessagesPage />,
    authOnly: true,
  },
  // Articles
  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: getRouteArticleDetails(":id"),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticlePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(":id"),
    element: <ArticlePage />,
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
    path: "*",
    element: <NotFoundPage />,
  },
};
