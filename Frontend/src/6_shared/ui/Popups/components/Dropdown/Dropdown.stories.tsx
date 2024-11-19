import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "./Dropdown";

export default {
  title: "6_shared/Dropdown",
  component: Dropdown,
  argTypes: {
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
    trigger: { control: "text", description: "Element that triggers the dropdown" },
    className: { control: "text", description: "Additional class for styling" },
  },
} as ComponentMeta<typeof Dropdown>;

const items = [
  { content: "Profile", onClick: () => alert("Profile Clicked") },
  { content: "Settings", onClick: () => alert("Settings Clicked") },
  { content: "Logout", onClick: () => alert("Logout Clicked"), disabled: true },
];

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ padding: "100px" }}>
    <Dropdown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  items,
  trigger: <button>Open Dropdown</button>,
  direction: "bottom right",
};

export const WithDisabledItem = Template.bind({});
WithDisabledItem.args = {
  items,
  trigger: <button>Dropdown with Disabled Item</button>,
  direction: "bottom right",
};
