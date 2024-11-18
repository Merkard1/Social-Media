import { memo, useCallback } from "react";

import { useTheme } from "@/1_app/providers/ThemeProvider";

import { saveJsonSettings } from "@/5_entities/User";

import ThemeIcon from "@/6_shared/assets/icons/theme.svg";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Icon } from "@/6_shared/ui/Icon/Icon";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />
  );
});
