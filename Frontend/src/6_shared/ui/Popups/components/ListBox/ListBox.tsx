import { Listbox as HListBox } from "@headlessui/react";
import { Fragment, ReactNode, useMemo } from "react";

import ArrowIcon from "@/6_shared/assets/icons/arrow-bottom.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { DropdownDirection } from "@/6_shared/types/ui";
import { HStack } from "@/6_shared/ui/Stack";

import { Button } from "../../../Button/Button";
import { Icon } from "../../../Icon/Icon";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";

import cls from "./ListBox.module.scss";

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom right",
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [
          className,
          popupCls.popup,
        ])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button
          as={Button}
          variant="filled"
          // disabled={readonly}
          addonRight={<Icon Svg={ArrowIcon} />}
        >
          {selectedItem?.content ?? defaultValue}
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}