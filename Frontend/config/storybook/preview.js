import { addDecorator } from "@storybook/react";

// TODO /RouterDecorator/RouterDecorator -> shared /RouterDecorator
import { FeaturesFlagsDecorator } from "../../src/6_shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator";
import { RouterDecorator } from "../../src/6_shared/config/storybook/RouterDecorator/RouterDecorator";
import { StyleDecorator } from "../../src/6_shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  themes: {
    default: "light",
    list: [
      { name: "light", class: "app_light_theme", color: "#ffffff" },
      { name: "dark", class: "app_dark_theme", color: "#000000" },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator("app_light_theme"));
addDecorator(RouterDecorator);
addDecorator(FeaturesFlagsDecorator({}));
