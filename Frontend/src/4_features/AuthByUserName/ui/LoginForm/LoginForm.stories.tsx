import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import LoginForm from "./LoginForm";

export default {
  title: "4_features/LoginForm",
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

Primary.decorators = [
  StoreDecorator({
    loginForm: {
      username: "username",
      password: "password123",
      isLoading: false,
    },
  }),
];

export const Error = Template.bind({});
Error.args = {};

Error.decorators = [
  StoreDecorator({
    loginForm: {
      username: "username",
      password: "password123",
      error: "Error",
      isLoading: false,
    },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};

Loading.decorators = [
  StoreDecorator({
    loginForm: {
      username: "username",
      password: "password123",
      isLoading: true,
    },
  }),
];
