import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotificationItem } from "./NotificationItem";

export default {
  title: "5_entities/Notification/NotificationItem",
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  item: {
    title: "title",
    id: "1",
    description: "some description",
  },
};
