import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Card } from "./Card";

export default {
  title: "6_shared/Card",
  component: Card,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["normal", "outlined", "light"],
      description: "The style variant of the card",
    },
    padding: {
      control: { type: "select" },
      options: ["0", "8", "16", "24"],
      description: "Padding inside the card",
    },
    border: {
      control: { type: "select" },
      options: ["round", "normal", "partial"],
      description: "Border style of the card",
    },
    max: {
      control: { type: "boolean" },
      description: "If true, the card takes the maximum width available",
    },
    fullHeight: {
      control: { type: "boolean" },
      description: "If true, the card takes the full height of its parent container",
    },
    children: {
      control: "text",
      description: "Content to display inside the card",
    },
    className: {
      control: "text",
      description: "Custom class name for styling",
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "This is a normal card with default padding and border.",
  variant: "normal",
  padding: "8",
  border: "normal",
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: "This is an outlined card with padding and rounded borders.",
  variant: "outlined",
  padding: "16",
  border: "round",
};

export const LightVariant = Template.bind({});
LightVariant.args = {
  children: "This is a light card variant with no padding.",
  variant: "light",
  padding: "0",
  border: "normal",
};
