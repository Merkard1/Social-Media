import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Article } from "../../model/types/article";

import { ArticleList } from "./ArticleList";

export default {
  title: "5_entities/Article/ArticleList",
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

const article = {} as Article;

export const LoadingBig = Template.bind({});
LoadingBig.args = {
  articles: [],
  isLoading: true,
  view: "BIG",
};

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
  articles: [],
  isLoading: true,
  view: "SMALL",
};

export const ListSmall = Template.bind({});
ListSmall.args = {
  articles: new Array(9)
    .fill(0)
    .map((item, index) => ({
      ...article,
      id: String(index),
    })),
  isLoading: false,
  view: "SMALL",
};

export const ListBig = Template.bind({});
ListBig.args = {
  articles: new Array(9)
    .fill(0)
    .map((item, index) => ({
      ...article,
      id: String(index),
    })),
  isLoading: false,
  view: "BIG",
};
