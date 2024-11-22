import { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useFocusNextOnTab } from "@/6_shared/lib/hooks/useFocusNextOnTab/useFocusNextOnTab";
import { useForceUpdate } from "@/6_shared/lib/render/forceUpdate";
import { Button } from "@/6_shared/ui/Button/Button";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack, VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import loginByUsername from "../../model/services/loginByUsername/loginByUserName";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";

import cls from "./LoginForm.module.scss";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
    onRegistrationButtonClick: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess, onRegistrationButtonClick } = props;
  const { t } = useTranslation("auth");
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername) || "admin";
  const password = useSelector(getLoginPassword) || "securePassword123";
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  const handlePasswordKeyDown = useFocusNextOnTab(enterButtonRef, isLoading);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <VStack
        gap="16"
        className={classNames(cls.LoginForm, {}, [className])}
      >
        <Text title={t("Login Form")} />
        {error && (
          <Text
            text={t("You entered an incorrect username or password")}
            variant="error"
          />
        )}
        <Input
          autofocus
          type="text"
          className={cls.input}
          aria-label="Username"
          placeholder={t("Username")}
          onChange={onChangeUsername}
          value={username}
          tabIndex={1}
        />
        <Input
          type="text"
          className={cls.input}
          aria-label="Password"
          placeholder={t("Password")}
          onChange={onChangePassword}
          onKeyDown={handlePasswordKeyDown}
          value={password}
          tabIndex={2}
        />
        <HStack max justify="between">
          <Button
            variant="clear"
            className={cls.loginBtn}
            onClick={onRegistrationButtonClick}
            disabled={isLoading}
            tabIndex={3}
          >
            {t("New here?")}
          </Button>
          <Button
            className={cls.loginBtn}
            onClick={onLoginClick}
            ref={enterButtonRef}
            disabled={isLoading}
            tabIndex={4}
          >
            {t("Enter")}
          </Button>
        </HStack>

      </VStack>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
