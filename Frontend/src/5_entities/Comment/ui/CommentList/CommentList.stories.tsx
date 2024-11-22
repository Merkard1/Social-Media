import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CommentList } from "./CommentList";

export default {
  title: "5_entities/Comment/CommentList",
  component: CommentList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: "1",
      text: "hello world",
      user: {
        id: "1",
        username: "usename1",
        email: "usename1@email.com",
        roles: [],
        features: null,
        jsonSettings: null,
        profile: null,
      },
    },
    {
      id: "2",
      text: "Comment 2",
      user: {
        id: "2",
        username: "username2",
        email: "usename2@email.com",
        roles: [],
        features: null,
        jsonSettings: null,
        profile: null,
      },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
