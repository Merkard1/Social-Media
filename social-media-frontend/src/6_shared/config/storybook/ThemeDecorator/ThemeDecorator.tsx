import { Story } from "@storybook/react";

import { ThemeProvider } from "@/1_app/providers/ThemeProvider";

import { Theme } from "@/6_shared/const/theme";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
