import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ErrorPage } from "./ErrorPage";

export default {
  title: "3_widgets/ErrorPage",
  component: ErrorPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => (
  <ErrorPage {...args} />
);

export const Default = Template.bind({});
Default.args = {};
