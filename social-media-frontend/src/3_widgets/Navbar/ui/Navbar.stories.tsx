import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { Navbar } from "./Navbar";

export default {
  title: "3_widgets/Navbar",
  component: Navbar,
  argTypes: {
    className: {
      control: "text",
      description: "Additional classes for styling",
    },
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: undefined,
      },
    }),
  ],
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
LoggedOut.decorators = [
  StoreDecorator({
    user: {
      authData: undefined,
    },
  }),
];

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
LoggedIn.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: "1",
        username: "TestUser",
      },
    },
  }),
];
