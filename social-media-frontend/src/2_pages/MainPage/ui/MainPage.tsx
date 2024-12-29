import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/3_widgets/Page";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="MainPage">
      {t("Main")}
    </Page>
  );
};

export default memo(MainPage);
