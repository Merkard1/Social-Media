import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { AvatarDropdown } from "./AvatarDropdown";

export default {
  title: "4_features/AvatarDropdown",
  component: AvatarDropdown,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS class for styling",
    },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
);

export const Default = Template.bind({});
Default.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: "1",
        username: "TestUser",
        avatar: "https://via.placeholder.com/150",
        roles: ["USER"],
      },
    },
  }),
];

export const AdminAccess = Template.bind({});
AdminAccess.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: "1",
        username: "AdminUser",
        avatar: "https://via.placeholder.com/150",
        roles: ["ADMIN"],
      },
    },
  }),
];

export const ManagerAccess = Template.bind({});
ManagerAccess.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: "1",
        username: "ManagerUser",
        avatar: "https://via.placeholder.com/150",
        roles: ["MANAGER"],
      },
    },
  }),
];

export const LoggedOut = Template.bind({});
LoggedOut.decorators = [
  StoreDecorator({
    user: {
      authData: undefined,
    },
  }),
];
