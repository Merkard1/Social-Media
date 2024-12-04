import { lazy } from "react";

const ArticleAsyncPage = lazy(() => import("./ArticlePage"));

export default ArticleAsyncPage;
