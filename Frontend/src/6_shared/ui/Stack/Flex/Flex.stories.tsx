import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HStack } from "../HStack/HStack";

import { Flex } from "./Flex";

export default {
  title: "6_shared/Flex",
  component: Flex,
  argTypes: {
    justify: {
      control: { type: "select" },
      options: ["start", "center", "end", "between"],
      description: "Sets the flex justify-content property",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "Sets the flex align-items property",
    },
    direction: {
      control: { type: "select" },
      options: ["row", "column"],
      description: "Sets the flex direction",
    },
    gap: {
      control: { type: "select" },
      options: ["4", "8", "16", "24", "32"],
      description: "Sets the gap between children",
    },
    wrap: {
      control: { type: "select" },
      options: ["nowrap", "wrap"],
      description: "Sets the flex-wrap property",
    },
    max: {
      control: { type: "boolean" },
      description: "If true, sets the container to take the maximum width or height",
    },
    className: { control: "text", description: "Custom class for styling" },
  },
} as ComponentMeta<typeof Flex>;

const FlexTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex {...args}>
    <div style={{ backgroundColor: "lightgray", padding: "8px" }}>Item 1</div>
    <div style={{ backgroundColor: "lightgray", padding: "8px" }}>Item 2</div>
    <div style={{ backgroundColor: "lightgray", padding: "8px" }}>Item 3</div>
  </Flex>
);

export const Default = FlexTemplate.bind({});
Default.args = {
  justify: "start",
  align: "center",
  direction: "row",
  gap: "16",
};

export const RowGap = FlexTemplate.bind({});
RowGap.args = {
  justify: "between",
  align: "center",
  direction: "row",
  gap: "24",
};

export const Column = FlexTemplate.bind({});
Column.args = {
  justify: "center",
  align: "center",
  direction: "column",
  gap: "16",
};

export const Wrap = FlexTemplate.bind({});
Wrap.args = {
  justify: "start",
  align: "start",
  direction: "row",
  wrap: "wrap",
};

export const MaxWidth = FlexTemplate.bind({});
MaxWidth.args = {
  justify: "center",
  align: "center",
  direction: "row",
  max: true,
};

const HStackTemplate: ComponentStory<typeof HStack> = (args) => (
  <HStack {...args}>
    <div style={{ backgroundColor: "lightblue", padding: "8px" }}>HStack Item 1</div>
    <div style={{ backgroundColor: "lightblue", padding: "8px" }}>HStack Item 2</div>
    <div style={{ backgroundColor: "lightblue", padding: "8px" }}>HStack Item 3</div>
  </HStack>
);
