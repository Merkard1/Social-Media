import { createContext } from "react";

import { Theme } from "@/6_shared/const/theme";

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "SomeRandomkeyForTheme";
