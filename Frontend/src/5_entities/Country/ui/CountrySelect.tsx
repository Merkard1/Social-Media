import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ListBox } from "@/6_shared/ui/Popups";

import { Country } from "../model/consts/countryConsts";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
  { value: Country.CA, content: Country.CA },
  { value: Country.US, content: Country.US },
  { value: Country.FR, content: Country.FR },
  { value: Country.DE, content: Country.DE },
  { value: Country.MX, content: Country.MX },
];

const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    const props = {
      className,
      value,
      defaultValue: t("Укажите страну"),
      label: t("Укажите страну"),
      items: options,
      onChange: onChangeHandler,
      readonly,
      direction: "top right" as const,
    };

    return (
      <ListBox {...props} />
    );
  },
);

export default CountrySelect;
