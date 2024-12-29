import { Suspense, useCallback, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { routeConfig } from "@/1_app/config/routeConfig/routeConfig";
import { AppRoutesProps } from "@/1_app/config/routeConfig/routeType";

import { PageLoader } from "@/4_features/PageLoader/PageLoader";

import { ErrorBoundary } from "../../ErrorBoundary";

import RequireAuth from "./RequireAuth";

const AppRouter = () => {
  const location = useLocation();
  const preloadedModules = useRef<Set<string>>(new Set());

  useEffect(() => {
    const currentRoute = Object.values(routeConfig).find((route) => {
      const regexPath = new RegExp(
        `^${route.path.replace(/:\w+/g, "\\w+")}$`,
      );
      return regexPath.test(location.pathname);
    });

    if (currentRoute?.preload && Array.isArray(currentRoute.preload)) {
      Promise.all(
        currentRoute.preload.map((preloadFn) => {
          const modulePath = preloadFn.toString();
          if (!preloadedModules.current.has(modulePath)) {
            preloadedModules.current.add(modulePath);
            return preloadFn();
          }
          return Promise.resolve();
        }),
      ).catch((error: Error) => {
        console.error("Error during preloading:", error);
      });
    }
  }, [location]);

  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>
              {element}
            </RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return (
    <ErrorBoundary>
      <Routes>
        {Object.values(routeConfig).map(renderWithWrapper)}
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRouter;
