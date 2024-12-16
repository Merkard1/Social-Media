import { memo, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useFocusNextOnTab } from "@/6_shared/lib/hooks/useFocusNextOnTab/useFocusNextOnTab";
import { Button } from "@/6_shared/ui/Button/Button";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { getRegistrationEmail } from "../../model/selectors/getRegistrationEmail/getRegistrationEmail";
import { getRegistrationError } from "../../model/selectors/getRegistrationError/getRegistrationError";
import { getRegistrationIsLoading } from "../../model/selectors/getRegistrationIsLoading/getRegistrationIsLoading";
import { getRegistrationPassword } from "../../model/selectors/getRegistrationPassword/getRegistrationPassword";
import { getRegistrationRepeatPassword } from "../../model/selectors/getRegistrationRepeatPassword/getRegistrationRepeatPassword";
import { getRegistrationUsername } from "../../model/selectors/getRegistrationUsername/getRegistrationUsername";
import registration from "../../model/services/registration/registration";
import { registrationActions, registrationReducer } from "../../model/slice/registrationSlice";

import cls from "./RegistrationForm.module.scss";

export interface RegistrationFormProps {
  className?: string;
  onSuccess: () => void;
  onLoginButtonClick: () => void;
}

const initialReducers: ReducersList = {
  registrationForm: registrationReducer,
};

const RegistrationForm = memo((props: RegistrationFormProps) => {
  const { className, onSuccess, onLoginButtonClick } = props;
  const { t } = useTranslation("auth");
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const username = useSelector(getRegistrationUsername || "admin");
  const email = useSelector(getRegistrationEmail || "test@example.test");
  const password = useSelector(getRegistrationPassword || "securePassword123");
  const repeatPassword = useSelector(getRegistrationRepeatPassword || "securePassword123");
  const isLoading = useSelector(getRegistrationIsLoading);
  const error = useSelector(getRegistrationError);

  const registerButtonRef = useRef<HTMLButtonElement>(null);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(registrationActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(registrationActions.setEmail(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(registrationActions.setPassword(value));
    },
    [dispatch],
  );

  const onChangeRepeatPassword = useCallback(
    (value: string) => {
      dispatch(registrationActions.setRepeatPassword(value));
    },
    [dispatch],
  );

  const onRegistrationClick = useCallback(async () => {
    if (password !== repeatPassword) {
      setErrorMessage(t("Passwords do not match"));
      return;
    }

    const result = await dispatch(registration({ username, email, password, repeatPassword }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    } else {
      setErrorMessage(t("Registration failed. Please try again."));
    }
  }, [dispatch, username, email, password, repeatPassword, onSuccess, t]);

  const handleRepeatPasswordKeyDown = useFocusNextOnTab(registerButtonRef, isLoading);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <VStack
        gap="16"
        className={classNames(cls.LoginForm, {}, [className])}
      >
        <Text title={t("Registration Form")} />
        {errorMessage && (
          <Text
            text={t(errorMessage)}
            variant="error"
          />
        )}
        <Input
          autofocus
          type="text"
          className={cls.input}
          placeholder={t("Username")}
          aria-label="Username"
          onChange={onChangeUsername}
          value={username}
          tabIndex={1}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t("Email")}
          aria-label="Email"
          onChange={onChangeEmail}
          value={email}
          tabIndex={2}
        />
        <Input
          type="password"
          className={cls.input}
          placeholder={t("Password")}
          aria-label="Password"
          onChange={onChangePassword}
          value={password}
          tabIndex={3}
        />
        <Input
          type="password"
          className={cls.input}
          placeholder={t("Repeat password")}
          aria-label="Repeat password"
          onChange={onChangeRepeatPassword}
          onKeyDown={handleRepeatPasswordKeyDown}
          value={repeatPassword}
          tabIndex={4}
        />
        <HStack max justify="between">
          <Button
            variant="clear"
            className={cls.loginBtn}
            onClick={onLoginButtonClick}
            disabled={isLoading}
            tabIndex={5}
          >
            {t("Back to login")}
          </Button>
          <Button
            type="button"
            className={cls.loginBtn}
            onClick={onRegistrationClick}
            ref={registerButtonRef}
            disabled={isLoading}
            tabIndex={6}
          >
            {t("Register")}
          </Button>
        </HStack>
      </VStack>
    </DynamicModuleLoader>
  );
});

export default RegistrationForm;
