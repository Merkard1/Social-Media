import { ChangeEvent, useCallback, useMemo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string | number;
}

interface SelectProps<T extends string> {
 className?: string,
 label?: string | number,
 options?: SelectOption<T>[];
 value?: T;
 onChange?: (value: T) => void,
 readOnly?: boolean
}

const Select = <T extends string> (props : SelectProps<T>) => {
  const { className, label, options, value, onChange, readOnly } = props;

  const optionsList = useMemo(() => options?.map((opt) => (
    <option className={cls.option} value={opt.value} key={opt.value}>{opt.content}</option>
  )), [options]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  }, [onChange]);

  return (
    <div className={classNames(cls.Select, {}, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readOnly}>
        {optionsList}
      </select>
    </div>
  );
};

export default Select;
