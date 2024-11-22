import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { ArticleDetails } from "./ArticleDetails";

export default {
  title: "5_entities/Article/ArticleDetails",
  component: ArticleDetails,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => <ArticleDetails {...args} />;

// TODO
// const article: Article = {};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  articleDetails: {
    // data: article,
  },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
  articleDetails: {
    isLoading: true,
  },
})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
  articleDetails: {
    error: "error",
  },
})];
