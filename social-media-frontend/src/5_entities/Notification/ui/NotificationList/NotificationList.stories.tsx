import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { NotificationList } from "./NotificationList";

export default {
  title: "5_entities/Notification/NotificationList",
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: "GET",
      status: 200,
      response: [
        {
          id: "1",
          title: "Уведомление",
          description: "Desc",
        },
        {
          id: "2",
          title: "Уведомление 2",
          description: "Desc",
        },
        {
          id: "3",
          title: "Уведомление 3",
          description: "Desc",
        },
      ],
    },
  ],
};
