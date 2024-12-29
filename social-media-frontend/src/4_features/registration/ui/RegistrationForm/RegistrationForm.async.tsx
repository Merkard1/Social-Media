import { FC, lazy } from "react";

import { RegistrationFormProps } from "./RegistrationForm";

const RegistrationFormAsync = lazy<FC<RegistrationFormProps>>(() => import("./RegistrationForm"));

export default RegistrationFormAsync;
