import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar } from "./Avatar";

export default {
  title: "6_shared/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Size of the avatar (width and height in pixels)",
    },
    src: {
      control: "text",
      description: "URL of the avatar image",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://via.placeholder.com/100",
  alt: "Default Avatar",
};
