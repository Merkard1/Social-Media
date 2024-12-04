export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    MESSAGES = "messages",

    ARTICLES = "articles",
    ARTICLE_CREATE = "article_create",
    ARTICLE_EDIT = "edit",
    ARTICLE_DETAILS = "article_details",
    ADMIN_PANEL = "admin_panel",
    SETTINGS = "settings",
    FORBIDDEN = "forbidden",
    // last
    NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (username: string) => `/profile/${username}`;
export const getRouteMessages = () => "/messages";
// Articles

export const getRouteArticles = () => "/articles";
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => "/articles/new";
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;

export const getRouteAdmin = () => "/admin";
export const getRouteSettings = () => "/settings";
export const getRouteForbidden = () => "/forbidden";

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(":username")]: AppRoutes.PROFILE,
  // Articles
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleEdit(":id")]: AppRoutes.ARTICLE_EDIT,
  [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  [getRouteArticleDetails(":id")]: AppRoutes.ARTICLE_DETAILS,
  // Additional
  [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
