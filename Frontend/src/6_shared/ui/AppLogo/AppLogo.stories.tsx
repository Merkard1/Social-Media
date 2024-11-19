import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AppLogo } from "./AppLogo";

export default {
  title: "6_shared/AppLogo",
  component: AppLogo,
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Size of the logo (width and height in pixels)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
    },
  },
} as ComponentMeta<typeof AppLogo>;

const Template: ComponentStory<typeof AppLogo> = (args) => <AppLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 50,
};

export const Large = Template.bind({});
Large.args = {
  size: 100,
};

export const Small = Template.bind({});
Small.args = {
  size: 25,
};
