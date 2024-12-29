import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AppLink } from "./AppLink";

export default {
  title: "6_shared/AppLink",
  component: AppLink,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "red"],
      description: "Visual style of the link",
    },
    to: {
      control: "text",
      description: "Destination URL for the link",
    },
    children: {
      control: "text",
      description: "Content inside the link",
    },
    activeClassName: {
      control: "text",
      description: "Class applied when the link is active",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
    },
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  to: "/",
  children: "Primary Link",
  variant: "primary",
};

export const Red = Template.bind({});
Red.args = {
  to: "/red",
  children: "Red Link",
  variant: "red",
};

export const Active = Template.bind({});
Active.args = {
  to: "/active",
  children: "Active Link",
  variant: "primary",
  activeClassName: "active-link",
};
Active.decorators = [
  (Story) => (
    <div>
      <Story />
    </div>
  ),
];

export const CustomClass = Template.bind({});
CustomClass.args = {
  to: "/custom",
  children: "Custom Class Link",
  className: "custom-link-class",
};
