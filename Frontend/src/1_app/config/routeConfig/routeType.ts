import { RouteProps } from "react-router-dom";

import { UserRole } from "@/5_entities/User";

export type AppRoutesProps = RouteProps & {
  path: string;
  element: React.ReactNode;
  authOnly?: boolean;
  roles?: UserRole[];
  preload?: Array<() => Promise<any>>;
};
