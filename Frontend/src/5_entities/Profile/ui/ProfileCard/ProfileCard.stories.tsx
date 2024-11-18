import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

import img from "@/6_shared/assets/tests/avatar.png";

import ProfileCard from "./ProfileCard";

export default {
  title: "5_Entities/ProfileCard",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: "admin",
    name: "name",
    age: 20,
    lastname: "lastname",
    country: Country.US,
    city: "city",
    currency: Currency.EUR,
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  data: {
    avatar: img,
    username: "admin",
    name: "name",
    age: 20,
    lastname: "lastname",
    country: Country.US,
    city: "city",
    currency: Currency.EUR,
  },
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};

export const error = Template.bind({});
error.args = {
  error: "SomeError",
};
