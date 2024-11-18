import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getRouteForbidden, getRouteMain } from "@/1_app/config/routeConfig/routeConfig";

import { useUserAuthData, UserRole, useUserRoles } from "@/5_entities/User";

interface RequireAuthProps {
  children: JSX.Element,
  roles?: UserRole[]
}

function RequireAuth(props: RequireAuthProps) {
  const { children, roles } = props;
  const auth = useUserAuthData();
  const location = useLocation();
  const userRoles = useUserRoles();

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    if (!userRoles) {
      return false;
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ form: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
