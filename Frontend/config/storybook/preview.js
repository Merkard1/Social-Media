import { addDecorator } from "@storybook/react";

// TODO /RouterDecorator/RouterDecorator -> shared /RouterDecorator
import { FeaturesFlagsDecorator } from "../../src/6_shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator";
import { RouterDecorator } from "../../src/6_shared/config/storybook/RouterDecorator/RouterDecorator";
import { StyleDecorator } from "../../src/6_shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "../../src/6_shared/const/theme";

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
      { name: "light", class: Theme.LIGHT, color: "#ffffff" },
      { name: "dark", class: Theme.DARK, color: "#000000" },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(FeaturesFlagsDecorator({}));
