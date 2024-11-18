import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginModal } from "@/4_features/AuthByUserName";
import { AvatarDropdown } from "@/4_features/avatarDropdown";
import { NotificationButton } from "@/4_features/notificationButton";

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
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useUserAuthData();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = cls.NavbarRedesigned;

  if (authData) {
    return (
      <header className={classNames(mainClass, {}, [className])}>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <Button
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Login")}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
};
