import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginModal } from "@/4_features/AuthByUsername";
import { AvatarDropdown } from "@/4_features/avatarDropdown";
import { NotificationButton } from "@/4_features/notificationButton";
import { RegistrationModal } from "@/4_features/registration";

import { useUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button } from "@/6_shared/ui/Button/Button";
import { HStack } from "@/6_shared/ui/Stack";

import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<"login" | "registration" | null>(null);

  const authData = useUserAuthData();

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const openLoginModal = useCallback(() => {
    setActiveModal("login");
  }, []);

  const openRegistrationModal = useCallback(() => {
    setActiveModal("registration");
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        onClick={openLoginModal}
      >
        {t("Login")}
      </Button>
      {activeModal === "login" && (
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeModal}
          onRegistrationButtonClick={openRegistrationModal}
        />
      )}
      {activeModal === "registration" && (
        <RegistrationModal
          isOpen={activeModal === "registration"}
          onClose={closeModal}
          onLoginButtonClick={openLoginModal}
        />
      )}
    </header>
  );
};
