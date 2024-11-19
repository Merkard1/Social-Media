import { ComponentStory, ComponentMeta } from "@storybook/react";

import TestImage from "@/6_shared/assets/icons/StorybookImage.svg";

import { Icon } from "./Icon";

export default {
  title: "6_shared/Icon",
  component: Icon,
  argTypes: {
    width: {
      control: { type: "number" },
      description: "Width of the icon (default is 32px)",
    },
    height: {
      control: { type: "number" },
      description: "Height of the icon (default is 32px)",
    },
    clickable: {
      control: { type: "boolean" },
      description: "Whether the icon is clickable",
    },
    className: {
      control: { type: "text" },
      description: "Additional class name for custom styling",
    },
    onClick: {
      action: "clicked",
      description: "Handler for click events (only for clickable icons)",
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  Svg: TestImage,
  width: 32,
  height: 32,
  clickable: false,
};

export const Clickable = Template.bind({});
Clickable.args = {
  Svg: TestImage,
  width: 40,
  height: 40,
  clickable: true,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  Svg: TestImage,
  width: 64,
  height: 64,
};

export const WithClassName = Template.bind({});
WithClassName.args = {
  Svg: TestImage,
  className: "custom-icon-class",
  clickable: false,
};
