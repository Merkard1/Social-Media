import { ComponentMeta, ComponentStory } from "@storybook/react";

import Select from "./Select";

export default {
  title: "6_shared/Select",
  component: Select,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    { value: "1", content: "One" },
    { value: "2", content: "Two" },
    { value: "3", content: "Three" },
    { value: "4", content: "Four" },
    { value: "5", content: "Five" },
  ],
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Label",
  options: [
    { value: "1", content: "One" },
    { value: "2", content: "Two" },
    { value: "3", content: "Three" },
    { value: "4", content: "Four" },
    { value: "5", content: "Five" },
  ],
};
