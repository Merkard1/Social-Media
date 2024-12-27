import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleDetailsResponse } from "../../model/types/Article";

import { ArticleListItem } from "./ArticleListItem";

export default {
  title: "5_entities/Article/ArticleListItem",
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />;

// TODO mock article
const article = {} as ArticleDetailsResponse;

export const Big = Template.bind({});
Big.args = {
  view: "BIG",
  article,
};

export const Small = Template.bind({});
Small.args = {
  view: "SMALL",
  article,
};
