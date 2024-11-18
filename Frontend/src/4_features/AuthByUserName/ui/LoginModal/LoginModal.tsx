import { Suspense } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Loader } from "@/6_shared/ui/Loader/Loader";
import { Modal } from "@/6_shared/ui/Modal/Modal";

import AcynLoginForm from "../LoginForm/AcyncLoginForm";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({
  className,
  isOpen = false,
  onClose,
}: LoginModalProps) => (
  <Modal
    className={classNames("", {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<Loader />}>
      <AcynLoginForm onSuccess={onClose} />
    </Suspense>
  </Modal>
);

export default LoginModal;
