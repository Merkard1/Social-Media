import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./Input";

export default {
  title: "6_shared/Input",
  component: Input,
  argTypes: {
    value: {
      control: "text",
      description: "The value of the input field",
    },
    label: {
      control: "text",
      description: "The label for the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    readOnly: {
      control: "boolean",
      description: "Makes the input read-only",
    },
    addonLeft: {
      control: "text",
      description: "Content to display in the left addon",
    },
    addonRight: {
      control: "text",
      description: "Content to display in the right addon",
    },
    size: {
      control: "radio",
      options: ["s", "m", "l"],
      description: "Size of the input field",
    },
    autofocus: {
      control: "boolean",
      description: "Automatically focuses the input when it is rendered",
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "",
  placeholder: "Enter text...",
  size: "m",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  value: "",
  placeholder: "Enter text...",
  label: "Name",
  size: "m",
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  value: "",
  placeholder: "Small input",
  size: "s",
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  value: "",
  placeholder: "Medium input",
  size: "m",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  value: "",
  placeholder: "Large input",
  size: "l",
};
