import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tabs, TabItem } from "./Tabs";

export default {
  title: "6_shared/Tabs",
  component: Tabs,
  argTypes: {
    value: { control: { type: "text" }, description: "Currently selected tab value" },
    direction: {
      control: { type: "radio" },
      options: ["row", "column"],
      description: "Direction of the tabs (horizontal or vertical)",
    },
    onTabClick: { action: "clicked", description: "Callback for tab click" },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

const tabs: TabItem<string>[] = [
  { value: "tab1", content: "Tab 1" },
  { value: "tab2", content: "Tab 2" },
  { value: "tab3", content: "Tab 3" },
];

export const Default = Template.bind({});
Default.args = {
  tabs,
  value: "tab1",
  direction: "row",
};

export const VerticalTabs = Template.bind({});
VerticalTabs.args = {
  tabs,
  value: "tab2",
  direction: "column",
};

export const InteractiveTabs = Template.bind({});
InteractiveTabs.args = {
  tabs,
  value: "tab1",
};
