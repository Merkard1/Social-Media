import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/6_shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggle = useCallback(async () => {
    await i18n.changeLanguage(i18n.language === "RU" ? "EN" : "RU");
  }, [i18n]);

  const displayText = useMemo(() => (i18n.language === "RU"
    ? { short: "EN", long: "English" }
    : { short: "RU", long: "Russian" }), [i18n.language]);

  return (
    <Button onClick={toggle} variant="clear">
      {short ? displayText.short : displayText.long}
    </Button>
  );
});
