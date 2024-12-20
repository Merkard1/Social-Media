import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/5_entities/User";

import ArticleIcon from "@/6_shared/assets/icons/article.svg";
import ProfileIcon from "@/6_shared/assets/icons/avatar.svg";
import MainIcon from "@/6_shared/assets/icons/home.svg";
import AboutIcon from "@/6_shared/assets/icons/Info.svg";
import ChatIcon from "@/6_shared/assets/icons/messages.svg";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteChat, getRouteProfile } from "@/6_shared/const/router";

import { SidebarItemType } from "../../types/sidebar";

export const useSidebarItems = () => {
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: t("Main"),
    },
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: t("About"),
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.username),
        Icon: ProfileIcon,
        text: t("Profile"),
        authOnly: true,
      },
      {
        path: getRouteChat(),
        Icon: ChatIcon,
        text: t("Messages"),
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        text: t("Articles"),
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
};
