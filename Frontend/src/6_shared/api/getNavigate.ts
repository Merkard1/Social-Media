export const getRouteMain = () => "/";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (username: string) => `/profile/${username}`;
export const getRouteSettings = () => "/settings";
export const getRouteMessages = () => "/messages";
// Articles
export const getRouteArticles = () => "/articles";
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => "/article/new";
export const getRouteArticleEdit = (id: string) => `/article/${id}/edit`;
// Admin
export const getRouteAdminPanel = () => "/admin";
export const getRouteForbidden = () => "/forbidden";
