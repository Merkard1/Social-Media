import { ReactElement } from "react";

import { ScrollToolbar } from "@/3_widgets/ScrollToolbar";

import { AppRoutes } from "@/6_shared/const/router";
import { useRouteChange } from "@/6_shared/router/useRouteChange";

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
}