import React from "react";

import { useJsonSettings } from "@/5_entities/User";

import ThemeProvider from "./ThemeProvider";

export const withTheme = (Component: React.ComponentType) => () => {
  const { theme: defaultTheme } = useJsonSettings();
  return (
    <ThemeProvider initialTheme={defaultTheme}>
      <Component />
    </ThemeProvider>
  );
};
