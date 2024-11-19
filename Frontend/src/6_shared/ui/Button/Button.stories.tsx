import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "6_shared/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["clear", "outline", "filled"],
      description: "Button variant for visual styles",
    },
    size: {
      control: { type: "select" },
      options: ["m", "l", "xl"],
      description: "Size of the button",
    },
    color: {
      control: { type: "select" },
      options: ["normal", "success", "error"],
      description: "Color theme of the button",
    },
    square: {
      control: { type: "boolean" },
      description: "If true, makes the button square",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the button",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "If true, the button will take full width of its container",
    },
    addonLeft: {
      control: "text",
      description: "Content to render on the left side of the button",
    },
    addonRight: {
      control: "text",
      description: "Content to render on the right side of the button",
    },
    children: {
      control: "text",
      description: "Content inside the button",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default Button",
  variant: "outline",
  size: "m",
  color: "normal",
};

export const Filled = Template.bind({});
Filled.args = {
  children: "Filled Button",
  variant: "filled",
  size: "l",
  color: "success",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "Clear Button",
  variant: "clear",
  size: "xl",
  color: "error",
};

export const Square = Template.bind({});
Square.args = {
  square: true,
  color: "normal",
  children: "",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  children: "Full Width Button",
  variant: "filled",
  color: "success",
};

export const WithAddons = Template.bind({});
WithAddons.args = {
  children: "Button with Addons",
  addonLeft: "🔥",
  addonRight: "➡️",
  variant: "outline",
  size: "l",
};
