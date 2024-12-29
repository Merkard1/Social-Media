import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Modal } from "./Modal";

export default {
  title: "6_shared/Modal",
  component: Modal,
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the modal is open",
    },
    children: {
      control: "text",
      description: "Content displayed inside the modal",
    },
    onClose: {
      action: "closed",
      description: "Callback triggered when the modal is closed",
    },
    className: {
      control: "text",
      description: "Custom class name for additional styling",
    },
    lazy: {
      control: "boolean",
      description: "Delays rendering of the modal until it's opened",
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.",
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.",
};
Dark.decorators = [ThemeDecorator("app_dark_theme")];
