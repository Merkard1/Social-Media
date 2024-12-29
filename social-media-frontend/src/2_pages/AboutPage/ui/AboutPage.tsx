import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/3_widgets/Page";

const AboutPage = () => {
  const { t } = useTranslation("about");

  return (
    <Page data-testid="AboutPage">
      {t("About")}
    </Page>
  );
};

export default memo(AboutPage);
