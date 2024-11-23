import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ListBox } from "@/6_shared/ui/Popups";

import { Currency } from "../../model/consts/currencyConsts";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    const props = {
      className,
      value,
      defaultValue: t("Specify currency"),
      label: t("Specify currency"),
      items: options,
      onChange: onChangeHandler,
      readonly,
      direction: "top right" as const,
    };

    return (
      <ListBox {...props} direction="bottom left" />
    );
  },
);

export default CurrencySelect;
