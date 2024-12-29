import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Skeleton } from "./Skeleton";

export default {
  title: "6_shared/Skeleton",
  component: Skeleton,
  argTypes: {
    height: {
      control: { type: "text" },
      description: "Height of the skeleton (can be in px, %, or other units)",
    },
    width: {
      control: { type: "text" },
      description: "Width of the skeleton (can be in px, %, or other units)",
    },
    border: {
      control: { type: "text" },
      description: "Border radius for rounded skeleton edges",
    },
    className: {
      control: "text",
      description: "Custom class for styling the skeleton",
    },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  height: "100px",
  width: "100%",
};

export const Square = Template.bind({});
Square.args = {
  height: "100px",
  width: "100px",
};

export const Circle = Template.bind({});
Circle.args = {
  height: "100px",
  width: "100px",
  border: "50%",
};

export const Rectangle = Template.bind({});
Rectangle.args = {
  height: "50px",
  width: "300px",
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  height: "200px",
  width: "200px",
  border: "10px",
  className: "custom-skeleton-class",
};
