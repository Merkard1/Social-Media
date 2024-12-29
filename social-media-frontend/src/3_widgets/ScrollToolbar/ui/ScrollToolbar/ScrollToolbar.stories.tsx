import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ScrollToolbar } from "./ScrollToolbar";

export default {
  title: "3_widgets/ScrollToolbar",
  component: ScrollToolbar,
  argTypes: {
    className: {
      control: "text",
      description: "Additional class for custom styling",
    },
  },
} as ComponentMeta<typeof ScrollToolbar>;

const Template: ComponentStory<typeof ScrollToolbar> = (args) => (
  <div>
    <ScrollToolbar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  className: "",
};
