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
    text: "Sample comment text",
    user: {
      id: "1",
      username: "Username",
      email: "Username@email.com",
      roles: [],
      features: null,
      jsonSettings: null,
      profile: null,
    },
  },
};

// Normal Comment Card
export const Normal = Template.bind({});
Normal.args = normalArgs;

// Normal Redesigned Comment Card
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

// Loading Comment Card
export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: "1",
    text: "hello world",
    user: {
      id: "1",
      username: "Username",
      email: "Username@email.com",
      roles: [],
      features: null,
      jsonSettings: null,
      profile: null,
    },
  },
  isLoading: true, // Simulating loading state
};

// Error Comment Card (example for additional scenario)
export const Error = Template.bind({});
Error.args = {
  comment: {
    id: "1",
    text: "Failed to load comment",
    user: {
      id: "",
      username: "",
      email: "",
      roles: [],
      features: null,
      jsonSettings: null,
      profile: null,
    },
  },
  isLoading: false,
};
