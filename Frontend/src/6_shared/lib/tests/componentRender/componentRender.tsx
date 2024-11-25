import { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";

import { StateSchema, StoreProvider } from "@/1_app/providers/StoreProvider";
import { ThemeProvider } from "@/1_app/providers/ThemeProvider";

import "@/1_app/styles/index.scss";
import i18nForTests from "@/6_shared/config/i18n/i18nForTests";
import { Theme } from "@/6_shared/const/theme";

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = "/",
    initialState,
    asyncReducers,
    theme = "app_light_theme",
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        asyncReducers={asyncReducers}
        initialState={initialState}
      >
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
