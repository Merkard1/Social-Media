import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./MessagesPage.module.scss";

interface MessagesPageProps {
 className?: string
}

const MessagesPage = (props : MessagesPageProps) => {
  const { className } = props;
  const { t } = useTranslation("messagesPage");
  return (
    <div className={classNames(cls.MessagesPage, {}, [className])}>
      {t("MessagesPage")}
    </div>
  );
};

export default MessagesPage;
