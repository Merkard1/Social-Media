import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/6_shared/const/theme";

import ProfilePage from "./ProfilePage";

export default {
  title: "2_pages/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
  // @ts-ignore
  <ProfilePage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  profile: {
    readOnly: true,
    form: {
      username: "username",
      age: 22,
      country: Country.US,
      lastname: "lastname",
      name: "firstname",
      city: "random city",
      currency: Currency.EUR,
    },
  },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: "username",
      age: 22,
      country: Country.US,
      lastname: "lastname",
      name: "firstname",
      city: "random city",
      currency: Currency.EUR,
    },
  },
})];
