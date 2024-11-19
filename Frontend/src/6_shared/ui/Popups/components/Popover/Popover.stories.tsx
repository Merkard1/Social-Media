import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Popover } from "./Popover";

export default {
  title: "6_shared/Popover",
  component: Popover,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: [
        "top left",
        "top right",
        "bottom left",
        "bottom right",
      ],
      description: "Direction in which the popover opens",
    },
    trigger: {
      control: "text",
      description: "Content or element that triggers the popover",
    },
    children: {
      control: "text",
      description: "Content displayed inside the popover",
    },
    className: {
      control: "text",
      description: "Additional class name for styling the popover",
    },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
    <Popover {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  direction: "bottom right",
  trigger: <button style={{ width: "500px" }}>Open Popover</button>,
  children: <div>This is the popover content!</div>,
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: "top left",
  trigger: <button style={{ width: "500px" }}>TriggerPopover</button>,
  children: (
    <div>
      Popover content aligned to top left.
    </div>
  ),
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: "bottom left",
  trigger: <button style={{ width: "500px" }}>Bottom Left Trigger</button>,
  children: (
    <div>
      Popover content aligned to bottom left.
    </div>
  ),
};
