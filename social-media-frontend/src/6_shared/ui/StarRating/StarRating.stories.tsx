import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StarRating } from "./StarRating";

export default {
  title: "6_shared/StarRating",
  component: StarRating,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const PreSelected = Template.bind({});
PreSelected.args = {
  selectedStars: 3,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  size: 50,
};
