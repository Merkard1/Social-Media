import { useContext } from "react";

import { Theme } from "@/6_shared/const/theme";

import { ThemeContext } from "./ThemeContext";

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: Theme) => void) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme;
    switch (theme) {
    case "app_dark_theme":
      newTheme = "app_light_theme";
      break;
    case "app_light_theme":
      newTheme = "app_dark_theme";
      break;
    default:

      newTheme = "app_light_theme";
    }
    setTheme?.(newTheme);

    saveAction?.(newTheme);
  };

  return {
    theme: theme || "app_light_theme",
    toggleTheme,
  };
}
