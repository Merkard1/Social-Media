import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import AboutPage from "./AboutPage";

export default {
  title: "2_pages/AboutPage",
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => (
  // @ts-ignore
  <AboutPage {...args} />
);

export const Default = Template.bind({});
Default.decorators = [StoreDecorator({})];
