import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { LoginModal } from "./LoginModal";

export default {
  title: "4_features/authByUserName/LoginModal",
  component: LoginModal,
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Determines if the modal is open or closed",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
    onClose: { action: "onClose", description: "Callback for closing the modal" },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};
Open.decorators = [
  StoreDecorator({
    user: { authData: undefined },
  }),
];

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
};
Closed.decorators = [
  StoreDecorator({
    user: { authData: undefined },
  }),
];
