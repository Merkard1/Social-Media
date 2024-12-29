import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotificationButton } from "./NotificationButton";

export default {
  title: "4_features/NotificationButton",
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
