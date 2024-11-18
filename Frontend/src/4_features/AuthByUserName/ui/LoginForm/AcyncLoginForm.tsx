import { FC, lazy } from "react";

import { LoginFormProps } from "./LoginForm";

const AsyncLoginForm = lazy<FC<LoginFormProps>>(() => import("./LoginForm"));

export default AsyncLoginForm;
