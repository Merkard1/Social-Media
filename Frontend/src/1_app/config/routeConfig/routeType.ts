import { RouteProps } from "react-router-dom";

import { UserRole } from "@/5_entities/User";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
