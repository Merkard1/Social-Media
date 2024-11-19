import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/6_shared/const/theme";

import { Drawer } from "./Drawer";

export default {
  title: "6_shared/Drawer",
  component: Drawer,
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the drawer is open",
    },
    lazy: {
      control: "boolean",
      description: "Delays the rendering of the drawer until opened",
    },
    onClose: {
      action: "closed",
      description: "Callback when the drawer is closed",
    },
    children: {
      control: "text",
      description: "Content to display inside the drawer",
    },
    className: {
      control: "text",
      description: "Custom class name for styling",
    },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  children: (
    <div>
      This is the content inside the drawer. You can scroll or interact here.
    </div>
  ),
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  isOpen: true,
  children: (
    <div>
      Drawer content in dark theme. Interact with it to test animations.
    </div>
  ),
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
