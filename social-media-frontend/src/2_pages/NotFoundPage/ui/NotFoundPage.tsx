import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/3_widgets/Page";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <Page data-testid="NotFoundPage" className={classNames(cls.NotFoundPage, {}, [className])}>
      {t("404")}
    </Page>
  );
});
