import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./ArticleCreatePage.module.scss";

interface ArticleEditPageProps {
 className?: string
}

const ArticleEditPage = ({ className } : ArticleEditPageProps) => {
  // TODO this page
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.ArticleEditPage, {}, [className])}>
      {t("Article Create Page")}
    </div>
  );
};

export default ArticleEditPage;
