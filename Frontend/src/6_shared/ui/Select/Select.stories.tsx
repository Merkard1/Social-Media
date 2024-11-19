import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select, { SelectOption } from "./Select";

export default {
  title: "6_shared/Select",
  component: Select,
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the select dropdown",
    },
    value: {
      control: "text",
      description: "Currently selected value",
    },
  },
} as ComponentMeta<typeof Select>;

const options: SelectOption<string>[] = [
  { value: "option1", content: "Option 1" },
  { value: "option2", content: "Option 2" },
  { value: "option3", content: "Option 3" },
];

const Template: ComponentStory<typeof Select> = (args) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100px" }}>
    <Select {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Select an Option",
  options,
  value: "option1",
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  options,
  value: "option2",
};
