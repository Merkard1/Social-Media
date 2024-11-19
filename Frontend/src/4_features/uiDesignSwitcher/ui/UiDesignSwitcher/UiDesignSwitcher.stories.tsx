import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { UiDesignSwitcher } from "./UiDesignSwitcher";

export default {
  title: "4_features/UiDesignSwitcher",
  component: UiDesignSwitcher,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling the component",
    },
  },
} as ComponentMeta<typeof UiDesignSwitcher>;

const Template: ComponentStory<typeof UiDesignSwitcher> = (args) => (
  <UiDesignSwitcher {...args} />
);

export const Default = Template.bind({});
Default.decorators = [StoreDecorator({})];
