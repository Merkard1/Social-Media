import { RouteProps } from "react-router-dom";

import { UserRole } from "@/5_entities/User";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  MESSAGES = "messages",
  SETTINGS = "settings",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
  // last
  NOT_FOUND = "not_found"
}
