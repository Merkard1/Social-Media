import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ListBox } from "./ListBox";

export default {
  title: "6_shared/ListBox",
  component: ListBox,
  argTypes: {
    label: { control: "text", description: "Label displayed next to the ListBox" },
    direction: {
      control: "select",
      options: [
        "top left",
        "top right",
        "bottom left",
        "bottom right",
      ],
      description: "Dropdown opening direction",
    },
    readonly: { control: "boolean", description: "Disable the ListBox" },
    value: { control: "text", description: "Current selected value" },
    defaultValue: { control: "text", description: "Default value to display" },
    className: { control: "text", description: "Additional class for styling" },
  },
} as ComponentMeta<typeof ListBox>;

const options = [
  { value: "option1", content: "Option 1" },
  { value: "option2", content: "Option 2" },
  { value: "option3", content: "Option 3", disabled: true },
];

const Template: ComponentStory<typeof ListBox> = (args) => (
  <div style={{ padding: "100px" }}>
    <ListBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Choose an Option",
  items: options,
  value: "option1",
  defaultValue: "Select...",
  direction: "bottom right",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read-Only ListBox",
  items: options,
  value: "option2",
  readonly: true,
};

export const NoDefaultValue = Template.bind({});
NoDefaultValue.args = {
  label: "No Default Value",
  items: options,
  value: undefined,
};
