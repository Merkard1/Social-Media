import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Text } from "./Text";

export default {
  title: "6_shared/Text",
  component: Text,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "error", "accent"],
      description: "Sets the text color variant",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "Sets the alignment of the text",
    },
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
      description: "Defines the size of the text",
    },
    bold: {
      control: { type: "boolean" },
      description: "Applies bold styling",
    },
    title: { control: "text", description: "Header text (optional)" },
    text: { control: "text", description: "Paragraph text (optional)" },
    className: { control: "text", description: "Custom class name for styling" },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Primary Title",
  text: "This is primary text.",
  variant: "primary",
  size: "m",
  align: "left",
};

export const Error = Template.bind({});
Error.args = {
  title: "Error Title",
  text: "This is error text.",
  variant: "error",
  size: "m",
  align: "center",
};

export const Accent = Template.bind({});
Accent.args = {
  title: "Accent Title",
  text: "This is accent text.",
  variant: "accent",
  size: "l",
  align: "right",
  bold: true,
};

export const SmallText = Template.bind({});
SmallText.args = {
  text: "This is small-sized text.",
  size: "s",
};

export const BoldText = Template.bind({});
BoldText.args = {
  title: "Bold Title",
  text: "This text is bold.",
  bold: true,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  title: "Custom Class Title",
  text: "This text uses a custom class.",
  className: "custom-text-class",
};
