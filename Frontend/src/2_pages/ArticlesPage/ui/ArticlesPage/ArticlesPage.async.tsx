import { lazy } from "react";

const MainPageAsync = lazy(() => import("./ArticlesPage"));

export default MainPageAsync;
