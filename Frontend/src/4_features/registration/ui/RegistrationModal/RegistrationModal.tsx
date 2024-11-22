import { Suspense } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Loader } from "@/6_shared/ui/Loader/Loader";
import { Modal } from "@/6_shared/ui/Modal/Modal";

import RegistrationFormAsync from "../RegistrationForm/RegistrationForm.async";

interface RegistrationModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onLoginButtonClick: () => void;
}

export const RegistrationModal = ({
  className,
  isOpen = false,
  onClose,
  onLoginButtonClick,
}: RegistrationModalProps) => (
  <Modal
    className={classNames("", {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<Loader />}>
      <RegistrationFormAsync onSuccess={onClose} onLoginButtonClick={onLoginButtonClick} />
    </Suspense>
  </Modal>
);
