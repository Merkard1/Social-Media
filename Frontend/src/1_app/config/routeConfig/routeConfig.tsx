import { AboutPage } from "@/2_pages/AboutPage";
import { AdminPanelPage } from "@/2_pages/AdminPanelPage";
import { ArticleCreatePage } from "@/2_pages/ArticleCreatePage";
import { ArticleDetailsPage } from "@/2_pages/ArticleDetailsPage";
import { ArticleEditPage } from "@/2_pages/ArticleEditPage";
import { ArticlesPage } from "@/2_pages/ArticlesPage";
import { ForbiddenPage } from "@/2_pages/ForbiddenPage";
import { MainPage } from "@/2_pages/MainPage";
import { MessagesPage } from "@/2_pages/MessagesPage";
import { NotFoundPage } from "@/2_pages/NotFoundPage";
import { ProfilePage } from "@/2_pages/ProfilePage";
import { SettingsPage } from "@/2_pages/SettingsPage";

import { getRouteAdminPanel, getRouteMessages } from "@/6_shared/api/getRoutes/getRoute";
import { getRouteAbout, getRouteArticleCreate, getRouteArticleDetails, getRouteArticleEdit, getRouteArticles, getRouteForbidden, getRouteMain, getRouteProfile, getRouteSettings } from "@/6_shared/const/router";

import { AppRoutes, AppRoutesProps } from "./routeType";

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
  [AppRoutes.SETTINGS]: {
    path: getRouteSettings(),
    element: <SettingsPage />,
    authOnly: true,
  },
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
    element: <ArticleCreatePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(":id"),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  // Admin only
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdminPanel(),
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
