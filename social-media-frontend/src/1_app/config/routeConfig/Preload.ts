export const preload = {
  AboutPagePreload: () => import("@/2_pages/AboutPage/ui/AboutPage.async"),
  AdminPanelPagePreload: () => import("@/2_pages/AdminPanelPage/ui/AdminPanelPage/AdminPanelPage.async"),
  ArticleDetailsPagePreload: () => import("@/2_pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.async"),
  ArticlesPagePreload: () => import("@/2_pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.async"),
  ChatPagePreload: () => import("@/2_pages/ChatPage/ui/ChatPage.async"),
  MainPagePreload: () => import("@/2_pages/MainPage/ui/MainPage.async"),
  ProfilePagePreload: () => import("@/2_pages/ProfilePage/ui/ProfilePage.async"),
  SettingsPagePreload: () => import("@/2_pages/SettingsPage/ui/SettingsPage/SettingsPage.async"),
  UpsertArticlePagePreload: () => import("@/2_pages/UpsertArticlePage/ui/UpsertArticlePage.async"),
};
