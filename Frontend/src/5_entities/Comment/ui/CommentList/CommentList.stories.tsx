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
      id: "2",
      content: "Comment 2",
      createdAt: "123",
      user: {
        username: "username2",
      },
      updatedAt: "",
    },
    {
      id: "2",
      content: "Comment 2",
      createdAt: "123",
      user: {
        username: "username2",
      },
      updatedAt: "",
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
