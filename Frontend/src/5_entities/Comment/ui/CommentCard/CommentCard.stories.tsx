import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NewDesignDecorator } from "@/6_shared/config/storybook/NewDesignDecorator/NewDesignDecorator";

import { CommentCard } from "./CommentCard";

export default {
  title: "5_entities/Comment/CommentCard",
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);
const normalArgs = {
  comment: {
    id: "1",
    text: "hello world",
    user: { id: "1", username: "Vasya" },
  },
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: "1",
    text: "hello world",
    user: { id: "1", username: "Username" },
  },
  isLoading: true,
};
