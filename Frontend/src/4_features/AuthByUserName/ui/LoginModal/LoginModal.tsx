import { Suspense } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Loader } from "@/6_shared/ui/Loader/Loader";
import { Modal } from "@/6_shared/ui/Modal/Modal";

import LoginFormAsync from "../LoginForm/LoginForm.async";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onRegistrationButtonClick: () => void;
}

export const LoginModal = ({
  className,
  isOpen = false,
  onClose,
  onRegistrationButtonClick,
}: LoginModalProps) => (
  <Modal
    className={classNames("", {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<Loader />}>
      <LoginFormAsync onSuccess={onClose} onRegistrationButtonClick={onRegistrationButtonClick} />
    </Suspense>
  </Modal>
);
